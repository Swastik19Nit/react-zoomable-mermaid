# React Zoomable Mermaid

A React component that renders Mermaid diagrams with pan and zoom capabilities. Built with [Mermaid.js](https://mermaid.js.org/) and [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom).

## Features

- Interactive pan and zoom controls
- Dynamic diagram updates
- Easy integration with React applications
- Customizable appearance and behavior
- Exposed methods for programmatic control

## Installation

```bash
npm install react-zoomable-mermaid
# or
yarn add react-zoomable-mermaid
# or
pnpm add react-zoomable-mermaid
```

## Usage

```jsx
import { ZoomableMermaid } from 'react-zoomable-mermaid';

function App() {
  const diagram = `
    graph TD
      A[Start] --> B{Is it working?}
      B -- Yes --> C[Great!]
      B -- No --> D[Debug]
      D --> B
      C --> E[Continue]
  `;

  return (
    <div style={{ height: '400px' }}>
      <ZoomableMermaid 
        chart={diagram}
        config={{
          theme: 'default',
          securityLevel: 'loose'
        }}
      />
    </div>
  );
}
```

## Props

### Required Props

- `chart: string`
  - The Mermaid diagram definition
  - Example: `graph TD; A-->B;`

### Optional Props

- `id?: string`
  - Unique identifier for the diagram
  - Default: 'mermaid-diagram'

- `config?: object`
  - Mermaid initialization options
  - See [Mermaid configuration](https://mermaid.js.org/config/configuration.html)
  - Default: `{}`

- `panZoomConfig?: object`
  - SVG pan-zoom configuration
  ```typescript
  {
    zoomEnabled: boolean,      // default: true
    controlIconsEnabled: boolean, // default: true
    fit: boolean,             // default: true
    center: boolean,          // default: true
    minZoom: number,         // default: 0.1
    maxZoom: number          // default: 10
  }
  ```

- `style?: object`
  - React style object for the container
  - Default: `{}`

- `className?: string`
  - Additional CSS classes
  - Default: ''

- `loading?: string`
  - Custom loading message
  - Default: 'Loading diagram...'

- `onLoad?: () => void`
  - Callback when diagram loads successfully

- `onError?: (error: Error) => void`
  - Callback when an error occurs

## Methods

The component exposes several methods through a ref:

```jsx
const mermaidRef = useRef();

// Available methods:
mermaidRef.current.zoomIn();      // Zoom in
mermaidRef.current.zoomOut();     // Zoom out
mermaidRef.current.resetZoom();   // Reset zoom level
mermaidRef.current.fit();         // Fit diagram to container
mermaidRef.current.center();      // Center the diagram
mermaidRef.current.getPanZoomInstance(); // Get svg-pan-zoom instance
```

## Advanced Usage

### With Custom Configuration

```jsx
const MyDiagram = () => {
  const mermaidRef = useRef();
  
  const diagram = `
    graph LR
      A[Hard edge] -->|Link text| B(Round edge)
      B --> C{Decision}
      C -->|One| D[Result one]
      C -->|Two| E[Result two]
  `;

  return (
    <div style={{ height: '500px', border: '1px solid #ccc' }}>
      <ZoomableMermaid
        ref={mermaidRef}
        chart={diagram}
        config={{
          theme: 'forest',
          themeVariables: {
            primaryColor: '#ff0000',
            primaryTextColor: '#fff'
          }
        }}
        panZoomConfig={{
          controlIconsEnabled: true,
          minZoom: 0.5,
          maxZoom: 5
        }}
        onLoad={() => console.log('Diagram loaded')}
        onError={(err) => console.error('Error:', err)}
      />
      <div>
        <button onClick={() => mermaidRef.current?.zoomIn()}>Zoom In</button>
        <button onClick={() => mermaidRef.current?.zoomOut()}>Zoom Out</button>
        <button onClick={() => mermaidRef.current?.fit()}>Fit</button>
      </div>
    </div>
  );
};
```

### Dynamic Updates

The component automatically re-renders when the `chart` prop changes:

```jsx
const DynamicDiagram = () => {
  const [direction, setDirection] = useState('TD');
  
  const diagram = `
    graph ${direction}
      A --> B
      B --> C
      C --> D
  `;
  
  return (
    <>
      <button onClick={() => setDirection(d => d === 'TD' ? 'LR' : 'TD')}>
        Toggle Direction
      </button>
      <ZoomableMermaid chart={diagram} />
    </>
  );
};
```

## TypeScript Support

The package includes TypeScript definitions. You can import types like this:

```typescript
import { ZoomableMermaid } from 'react-zoomable-mermaid';
import type { ZoomableMermaidProps, ZoomableMermaidRef } from 'react-zoomable-mermaid';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [Mermaid.js](https://mermaid.js.org/) - The diagramming library
- [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom) - The pan/zoom functionality
