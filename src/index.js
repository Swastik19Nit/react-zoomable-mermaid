import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const ZoomableMermaid = forwardRef(({ 
  chart, 
  id = 'mermaid-diagram',
  config = {},
  panZoomConfig = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
    minZoom: 0.1,
    maxZoom: 10
  },
  style = {},
  className = '',
  loading = 'Loading diagram...',
  onLoad = null,
  onError = null
}, ref) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const panZoomInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMermaid = async () => {
      try {
        // Dynamic import for better Next.js compatibility
        const mermaid = await import('mermaid');
        const mermaidAPI = mermaid.default;

        // Initialize mermaid
        mermaidAPI.initialize({
          startOnLoad: false,
          theme: 'default',
          ...config
        });

        if (!containerRef.current || !isMounted) return;

        // Clear previous content
        containerRef.current.innerHTML = '';

        // Generate unique ID to avoid conflicts
        const diagramId = `${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg } = await mermaidAPI.render(diagramId, chart);
        
        if (!isMounted) return;

        // Remove max-width constraint and inject SVG
        const cleanedSvg = svg.replace(/[ ]*max-width:[ 0-9\.]*px;/i, '');
        containerRef.current.innerHTML = cleanedSvg;

        // Initialize pan-zoom after SVG is rendered
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          // Ensure SVG has proper dimensions
          svgElement.style.width = '100%';
          svgElement.style.height = '100%';
          
          // Dynamically import svg-pan-zoom
          const svgPanZoom = await import('svg-pan-zoom');
          const svgPanZoomLib = svgPanZoom.default;
          
          if (isMounted) {
            panZoomInstance.current = svgPanZoomLib(svgElement, panZoomConfig);
          }
        }

        setIsLoading(false);
        setError(null);
        
        // Call onLoad callback if provided
        if (onLoad) {
          onLoad();
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
          
          // Call onError callback if provided
          if (onError) {
            onError(err);
          }
        }
      }
    };

    initializeMermaid();

    return () => {
      isMounted = false;
      // Cleanup pan-zoom instance
      if (panZoomInstance.current) {
        try {
          panZoomInstance.current.destroy();
        } catch (e) {
          console.warn('Error destroying pan-zoom instance:', e);
        }
        panZoomInstance.current = null;
      }
    };
  }, [chart, id, config, panZoomConfig, onLoad, onError]);

  // Utility methods that can be called from parent components
  const zoomIn = () => {
    if (panZoomInstance.current) {
      panZoomInstance.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (panZoomInstance.current) {
      panZoomInstance.current.zoomOut();
    }
  };

  const resetZoom = () => {
    if (panZoomInstance.current) {
      panZoomInstance.current.resetZoom();
    }
  };

  const fit = () => {
    if (panZoomInstance.current) {
      panZoomInstance.current.fit();
      panZoomInstance.current.center();
    }
  };

  const center = () => {
    if (panZoomInstance.current) {
      panZoomInstance.current.center();
    }
  };

  const getPanZoomInstance = () => {
    return panZoomInstance.current;
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    zoomIn,
    zoomOut,
    resetZoom,
    fit,
    center,
    getPanZoomInstance
  }));

  if (error) {
    return (
      <div 
        className={`zoomable-mermaid-error ${className}`}
        style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '4px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
          ...style
        }}
      >
        <strong>Error rendering diagram:</strong> {error}
      </div>
    );
  }

  return (
    <div 
      className={`zoomable-mermaid-container ${className}`}
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        ...style
      }}
    >
      {isLoading && (
        <div 
          className="zoomable-mermaid-loading"
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            fontSize: '14px',
            color: '#666'
          }}
        >
          {loading}
        </div>
      )}
      <div 
        ref={containerRef}
        className="zoomable-mermaid-diagram"
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: isLoading ? 0.3 : 1,
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
    </div>
  );
});

ZoomableMermaid.displayName = 'ZoomableMermaid';

export { ZoomableMermaid };