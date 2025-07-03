# Configuration Guide

## Mermaid Configuration

The `config` prop allows you to customize the Mermaid diagram's appearance and behavior. This is passed directly to Mermaid's initialize function.

### Basic Configuration

```jsx
<ZoomableMermaid
  chart={diagram}
  config={{
    theme: 'default',
    securityLevel: 'loose'
  }}
/>
```

### Available Themes

- `default` - Default theme
- `forest` - Green-based theme
- `dark` - Dark mode theme
- `neutral` - Neutral colors theme
- `base` - Basic theme

```jsx
<ZoomableMermaid
  chart={diagram}
  config={{
    theme: 'forest'
  }}
/>
```

### Theme Customization

You can customize theme colors using themeVariables:

```jsx
<ZoomableMermaid
  config={{
    theme: 'base',
    themeVariables: {
      primaryColor: '#ff0000',
      primaryTextColor: '#fff',
      primaryBorderColor: '#fff',
      lineColor: '#F8B229',
      secondaryColor: '#006100',
      tertiaryColor: '#fff'
    }
  }}
/>
```

### Security Levels

- `strict` (default) - Strict security
- `loose` - Allows more flexibility but less secure
- `antiscript` - Removes script tags

```jsx
<ZoomableMermaid
  config={{
    securityLevel: 'loose'
  }}
/>
```

## Pan and Zoom Configuration

The `panZoomConfig` prop customizes the pan and zoom behavior.

### Default Configuration

```jsx
<ZoomableMermaid
  panZoomConfig={{
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
    minZoom: 0.1,
    maxZoom: 10
  }}
/>
```

### Disable Controls

```jsx
<ZoomableMermaid
  panZoomConfig={{
    controlIconsEnabled: false
  }}
/>
```

### Custom Zoom Limits

```jsx
<ZoomableMermaid
  panZoomConfig={{
    minZoom: 0.5,  // Maximum zoom out (50%)
    maxZoom: 4     // Maximum zoom in (400%)
  }}
/>
```

### Disable Auto-fit and Center

```jsx
<ZoomableMermaid
  panZoomConfig={{
    fit: false,
    center: false
  }}
/>
```

## Styling

### Container Styling

Using the style prop:
```jsx
<ZoomableMermaid
  style={{
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }}
/>
```

Using className:
```jsx
<ZoomableMermaid
  className="my-diagram-container"
/>
```

```css
.my-diagram-container {
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
}
```

### Loading State

Customize the loading message:
```jsx
<ZoomableMermaid
  loading="Please wait while the diagram loads..."
/>
```

Or use JSX for custom loading state:
```jsx
<ZoomableMermaid
  loading={
    <div className="custom-loader">
      <Spinner />
      <span>Loading diagram...</span>
    </div>
  }
/>
```

## Error Handling

### Basic Error Handling

```jsx
<ZoomableMermaid
  onError={(error) => {
    console.error('Diagram error:', error);
    // Handle error (e.g., show notification)
  }}
/>
```

### With Error Boundary

```jsx
class DiagramErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error loading diagram</div>;
    }

    return this.props.children;
  }
}

// Usage
<DiagramErrorBoundary>
  <ZoomableMermaid chart={diagram} />
</DiagramErrorBoundary>
```

## Performance Optimization

### Lazy Loading

```jsx
const LazyZoomableMermaid = React.lazy(() => import('react-zoomable-mermaid'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyZoomableMermaid chart={diagram} />
    </Suspense>
  );
}