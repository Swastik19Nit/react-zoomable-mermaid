# Troubleshooting

## Common Issues and Solutions

### 1. Diagram Not Rendering

#### Symptoms
- Empty container
- Loading message persists
- Error in console about invalid diagram syntax

#### Solutions

1. **Check Diagram Syntax**
```jsx
// ❌ Invalid syntax
const diagram = `
  graph TD
  A->B // Missing brackets
`;

// ✅ Correct syntax
const diagram = `
  graph TD
  A[Start] --> B[End]
`;
```

2. **Verify Container Height**
```jsx
// ❌ No height specified
<div>
  <ZoomableMermaid chart={diagram} />
</div>

// ✅ Height specified
<div style={{ height: '400px' }}>
  <ZoomableMermaid chart={diagram} />
</div>
```

3. **Check Security Level**
```jsx
// Try setting security level to loose if having issues
<ZoomableMermaid
  chart={diagram}
  config={{
    securityLevel: 'loose'
  }}
/>
```

### 2. Pan/Zoom Controls Not Working

#### Symptoms
- Control icons missing
- Cannot zoom with mouse wheel
- Cannot pan by dragging

#### Solutions

1. **Enable Controls**
```jsx
<ZoomableMermaid
  panZoomConfig={{
    controlIconsEnabled: true,
    zoomEnabled: true
  }}
/>
```

2. **Check Container Size**
```jsx
// ❌ Container too small
<div style={{ height: '50px' }}>
  <ZoomableMermaid chart={diagram} />
</div>

// ✅ Adequate container size
<div style={{ height: '400px' }}>
  <ZoomableMermaid chart={diagram} />
</div>
```

### 3. Performance Issues

#### Symptoms
- Slow rendering
- Browser lag
- High memory usage

#### Solutions

1. **Lazy Load the Component**
```jsx
const LazyZoomableMermaid = React.lazy(() => import('react-zoomable-mermaid'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyZoomableMermaid chart={diagram} />
    </Suspense>
  );
}
```

2. **Optimize Diagram Complexity**
```jsx
// ❌ Complex diagram with many nodes
const complexDiagram = `
  graph TD
    A --> B --> C --> D --> E --> F --> G --> H --> I --> J
    A --> K --> L --> M --> N --> O --> P --> Q --> R --> S
    // ... many more nodes
`;

// ✅ Simplified diagram
const simplifiedDiagram = `
  graph TD
    A[Start] --> B[Process]
    B --> C[End]
    subgraph Details
      B --> D[Sub-process]
      D --> B
    end
`;
```

3. **Use Production Builds**
```jsx
// Ensure you're using production builds in your app
// In your package.json scripts:
{
  "build": "NODE_ENV=production webpack"
}
```

### 4. TypeScript Errors

#### Symptoms
- Type errors in IDE
- Build failures

#### Solutions

1. **Check Types Import**
```typescript
// ✅ Import types correctly
import { ZoomableMermaid } from 'react-zoomable-mermaid';
import type { ZoomableMermaidProps, ZoomableMermaidRef } from 'react-zoomable-mermaid';
```

2. **Proper Typing for Refs**
```typescript
// ❌ Incorrect ref typing
const ref = useRef();

// ✅ Correct ref typing
const ref = useRef<ZoomableMermaidRef>(null);
```

### 5. Server-Side Rendering Issues

#### Symptoms
- Hydration errors
- Content mismatch warnings

#### Solutions

1. **Dynamic Import**
```jsx
import dynamic from 'next/dynamic';

const DynamicZoomableMermaid = dynamic(
  () => import('react-zoomable-mermaid').then(mod => mod.ZoomableMermaid),
  { ssr: false }
);
```

2. **Use Effect for Initialization**
```jsx
function MyComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <ZoomableMermaid chart={diagram} />;
}
```

## Debugging Tips

1. **Enable Error Callbacks**
```jsx
<ZoomableMermaid
  chart={diagram}
  onError={(error) => {
    console.error('Diagram error:', error);
  }}
  onLoad={() => {
    console.log('Diagram loaded successfully');
  }}
/>
```

2. **Check Browser Console**
Look for:
- Syntax errors in diagram definition
- Mermaid initialization errors
- SVG-pan-zoom related errors

3. **Validate Mermaid Syntax**
Use the [Mermaid Live Editor](https://mermaid.live) to validate your diagram syntax before using it in the component.

## Still Having Issues?

If you're still experiencing problems:

1. Create a minimal reproduction of the issue
2. Check existing GitHub issues
3. Open a new issue with:
   - Complete error message
   - Reproduction steps
   - Environment details (browser, React version, etc.)
   - Code snippet demonstrating the problem