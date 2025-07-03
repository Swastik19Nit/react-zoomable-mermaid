import React, { RefObject } from 'react';

interface PanZoomConfig {
  zoomEnabled?: boolean;
  controlIconsEnabled?: boolean;
  fit?: boolean;
  center?: boolean;
  minZoom?: number;
  maxZoom?: number;
}

interface ZoomableMermaidProps {
  chart: string;
  id?: string;
  config?: Record<string, any>;
  panZoomConfig?: PanZoomConfig;
  style?: React.CSSProperties;
  className?: string;
  loading?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface ZoomableMermaidRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  fit: () => void;
  center: () => void;
  getPanZoomInstance: () => any;
}

export const ZoomableMermaid: React.ForwardRefExoticComponent<
  ZoomableMermaidProps & React.RefAttributes<ZoomableMermaidRef>
>;