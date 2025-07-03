# Getting Started with React Zoomable Mermaid

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install react-zoomable-mermaid

# Using yarn
yarn add react-zoomable-mermaid

# Using pnpm
pnpm add react-zoomable-mermaid
```

## Basic Usage

Here's a simple example to get you started:

```jsx
import { ZoomableMermaid } from 'react-zoomable-mermaid';

function SimpleFlowchart() {
  const diagram = `
    graph TD
      A[Start] --> B{Is it working?}
      B -- Yes --> C[Great!]
      B -- No --> D[Debug]
      D --> B
  `;

  return (
    <div style={{ height: '400px' }}>
      <ZoomableMermaid chart={diagram} />
    </div>
  );
}
```

## Important Notes

1. **Container Height**: Always specify a height for the container div. The component needs a defined height to render properly.

2. **Dynamic Updates**: The component automatically re-renders when the `chart` prop changes.

3. **Server-Side Rendering**: If you're using Next.js or another SSR framework, use dynamic imports:

```jsx
import dynamic from 'next/dynamic';

const DynamicZoomableMermaid = dynamic(
  () => import('react-zoomable-mermaid').then(mod => mod.ZoomableMermaid),
  { ssr: false }
);
```

## Using Zoom Controls

The component provides several methods through a ref:

```jsx
import { useRef } from 'react';
import { ZoomableMermaid } from 'react-zoomable-mermaid';

function DiagramWithControls() {
  const mermaidRef = useRef();
  
  return (
    <div>
      <ZoomableMermaid
        ref={mermaidRef}
        chart="graph TD; A-->B;"
      />
      <button onClick={() => mermaidRef.current?.zoomIn()}>
        Zoom In
      </button>
      <button onClick={() => mermaidRef.current?.zoomOut()}>
        Zoom Out
      </button>
      <button onClick={() => mermaidRef.current?.fit()}>
        Fit
      </button>
    </div>
  );
}
```

## Configuration

### Basic Configuration

```jsx
<ZoomableMermaid
  chart={diagram}
  config={{
    theme: 'forest',
    securityLevel: 'loose'
  }}
  panZoomConfig={{
    controlIconsEnabled: true,
    minZoom: 0.5,
    maxZoom: 5
  }}
/>
```

### Error Handling

```jsx
<ZoomableMermaid
  chart={diagram}
  onError={(error) => console.error('Diagram error:', error)}
  onLoad={() => console.log('Diagram loaded successfully')}
/>
```

## Next Steps

- Check out the [Examples](./examples.md) for more advanced usage
- Learn about all available options in the [Configuration Guide](./configuration.md)
- See the complete [API Reference](./api-reference.md)
- Troubleshoot common issues in the [Troubleshooting Guide](./troubleshooting.md)

## Community and Support

- [GitHub Issues](https://github.com/yourusername/react-zoomable-mermaid/issues) - Report bugs or request features
- [Contributing Guide](./contributing.md) - Learn how to contribute
- [Mermaid.js Documentation](https://mermaid.js.org/) - Learn more about Mermaid diagram syntax