## ZoomableMermaid Component

### Props

#### Required Props

##### `chart: string`
The Mermaid diagram definition string.
```jsx
<ZoomableMermaid chart="graph TD; A-->B;" />
```

#### Optional Props

##### `id?: string`
- Type: `string`
- Default: `'mermaid-diagram'`
- Description: Unique identifier for the diagram. Used internally for rendering.

##### `config?: object`
- Type: `object`
- Default: `{}`
- Description: Mermaid initialization options
- Example:
```jsx
<ZoomableMermaid
  config={{
    theme: 'forest',
    themeVariables: {
      primaryColor: '#ff0000'
    },
    securityLevel: 'loose'
  }}
/>
```

##### `panZoomConfig?: object`
- Type: `object`
- Default:
```js
{
  zoomEnabled: true,
  controlIconsEnabled: true,
  fit: true,
  center: true,
  minZoom: 0.1,
  maxZoom: 10
}
```
- Properties:
  - `zoomEnabled`: Enable/disable zoom functionality
  - `controlIconsEnabled`: Show/hide control icons
  - `fit`: Auto-fit diagram to container
  - `center`: Auto-center diagram
  - `minZoom`: Minimum zoom level
  - `maxZoom`: Maximum zoom level

##### `style?: object`
- Type: `React.CSSProperties`
- Default: `{}`
- Description: React style object for the container

##### `className?: string`
- Type: `string`
- Default: `''`
- Description: Additional CSS classes for the container

##### `loading?: string`
- Type: `string`
- Default: `'Loading diagram...'`
- Description: Custom loading message displayed while the diagram is being rendered

##### `onLoad?: () => void`
- Type: `Function`
- Default: `undefined`
- Description: Callback function invoked when diagram loads successfully

##### `onError?: (error: Error) => void`
- Type: `Function`
- Default: `undefined`
- Description: Callback function invoked when an error occurs during rendering

### Methods

The following methods are available through a ref:

#### `zoomIn()`
Increases the zoom level of the diagram.
```jsx
const ref = useRef();
ref.current.zoomIn();
```

#### `zoomOut()`
Decreases the zoom level of the diagram.
```jsx
ref.current.zoomOut();
```

#### `resetZoom()`
Resets the zoom level to default (1.0).
```jsx
ref.current.resetZoom();
```

#### `fit()`
Fits the diagram to the container size.
```jsx
ref.current.fit();
```

#### `center()`
Centers the diagram in the container.
```jsx
ref.current.center();
```

#### `getPanZoomInstance()`
Returns the underlying svg-pan-zoom instance for advanced control.
```jsx
const panZoomInstance = ref.current.getPanZoomInstance();
```

### TypeScript Support

The component includes TypeScript type definitions:

```typescript
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