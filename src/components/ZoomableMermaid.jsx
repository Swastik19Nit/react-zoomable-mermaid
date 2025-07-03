import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';

const ZoomableMermaid = ({ diagram, options = {} }) => {
  const containerRef = useRef(null);
  const svgPanZoomInstance = useRef(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
          
          mermaid.initialize({
            startOnLoad: false,
            ...options
          });

          const { svg } = await mermaid.render('mermaid-diagram', diagram);
          containerRef.current.innerHTML = svg;

          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgPanZoomInstance.current = svgPanZoom(svgElement, {
              zoomEnabled: true,
              panEnabled: true,
              controlIconsEnabled: true,
              fit: true,
              center: true,
              minZoom: 0.1,
              maxZoom: 10
            });
          }
        } catch (error) {
          console.error('Failed to render diagram:', error);
        }
      }
    };

    renderDiagram();

    return () => {
      if (svgPanZoomInstance.current) {
        svgPanZoomInstance.current.destroy();
      }
    };
  }, [diagram, options]);

  return <div ref={containerRef} className="zoomable-mermaid-container" />;
};

export default ZoomableMermaid;