# Examples

## Basic Examples

### Simple Flowchart

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

### Sequence Diagram

```jsx
function SequenceDiagram() {
  const diagram = `
    sequenceDiagram
      participant Alice
      participant Bob
      Alice->>John: Hello John, how are you?
      loop Healthcheck
          John->>John: Fight against hypochondria
      end
      Note right of John: Rational thoughts!
      John-->>Alice: Great!
      John->>Bob: How about you?
      Bob-->>John: Jolly good!
  `;

  return (
    <div style={{ height: '500px' }}>
      <ZoomableMermaid chart={diagram} />
    </div>
  );
}
```

## Advanced Examples

### Custom Theme and Controls

```jsx
function CustomThemedDiagram() {
  const diagram = `
    graph LR
      A[Hard edge] -->|Link text| B(Round edge)
      B --> C{Decision}
      C -->|One| D[Result one]
      C -->|Two| E[Result two]
  `;

  return (
    <div style={{ height: '400px' }}>
      <ZoomableMermaid
        chart={diagram}
        config={{
          theme: 'forest',
          themeVariables: {
            primaryColor: '#ff0000',
            primaryTextColor: '#fff',
            primaryBorderColor: '#fff',
            lineColor: '#F8B229',
            secondaryColor: '#006100',
            tertiaryColor: '#fff'
          }
        }}
        panZoomConfig={{
          controlIconsEnabled: true,
          minZoom: 0.5,
          maxZoom: 5
        }}
      />
    </div>
  );
}
```

### With Zoom Controls

```jsx
function DiagramWithControls() {
  const mermaidRef = useRef();
  const diagram = `
    graph TD
      A[Christmas] -->|Get money| B(Go shopping)
      B --> C{Let me think}
      C -->|One| D[Laptop]
      C -->|Two| E[iPhone]
      C -->|Three| F[Car]
  `;

  return (
    <div>
      <div style={{ height: '400px', border: '1px solid #ccc' }}>
        <ZoomableMermaid
          ref={mermaidRef}
          chart={diagram}
          config={{
            theme: 'default'
          }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => mermaidRef.current?.zoomIn()}>
          Zoom In
        </button>
        <button 
          onClick={() => mermaidRef.current?.zoomOut()}
          style={{ marginLeft: '0.5rem' }}
        >
          Zoom Out
        </button>
        <button 
          onClick={() => mermaidRef.current?.fit()}
          style={{ marginLeft: '0.5rem' }}
        >
          Fit
        </button>
        <button 
          onClick={() => mermaidRef.current?.center()}
          style={{ marginLeft: '0.5rem' }}
        >
          Center
        </button>
        <button 
          onClick={() => mermaidRef.current?.resetZoom()}
          style={{ marginLeft: '0.5rem' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

### Dynamic Updates

```jsx
function DynamicDiagram() {
  const [direction, setDirection] = useState('TD');
  const [nodes, setNodes] = useState(['A', 'B', 'C']);
  
  const diagram = `
    graph ${direction}
      ${nodes.map((node, i, arr) => 
        i < arr.length - 1 ? 
        `${node} --> ${arr[i + 1]}` : 
        ''
      ).join('\n      ')}
  `;
  
  return (
    <div>
      <div>
        <button onClick={() => setDirection(d => d === 'TD' ? 'LR' : 'TD')}>
          Toggle Direction
        </button>
        <button 
          onClick={() => setNodes([...nodes, String.fromCharCode(65 + nodes.length)])}
          style={{ marginLeft: '0.5rem' }}
        >
          Add Node
        </button>
      </div>
      <div style={{ height: '400px', marginTop: '1rem' }}>
        <ZoomableMermaid 
          chart={diagram}
          config={{
            theme: 'default'
          }}
        />
      </div>
    </div>
  );
}
```

### Error Handling

```jsx
function DiagramWithErrorHandling() {
  const [error, setError] = useState(null);
  const diagram = `
    graph TD
      A[Start] --> B{Is it working?}
      B -- Yes --> C[Great!]
      B -- No --> D[Debug]
      D --> B
  `;

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error.message}
        </div>
      )}
      <div style={{ height: '400px' }}>
        <ZoomableMermaid
          chart={diagram}
          onError={setError}
          onLoad={() => setError(null)}
        />
      </div>
    </div>
  );
}
```

### With Custom Loading State

```jsx
function DiagramWithCustomLoading() {
  return (
    <div style={{ height: '400px' }}>
      <ZoomableMermaid
        chart={`
          graph TD
            A[Start] --> B{Process}
            B -- Yes --> C[End]
            B -- No --> D[Retry]
            D --> B
        `}
        loading={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '0.5rem' 
          }}>
            <span className="loading-spinner" />
            Rendering diagram...
          </div>
        }
      />
    </div>
  );
}
```