'use client';

import { useState, useRef } from 'react';
import { ZoomableMermaid } from 'react-zoomable-mermaid';

const diagrams = {
  flowchart: `
    graph TD
      A[Start] --> B{Is it working?}
      B -- Yes --> C[Great!]
      B -- No --> D[Debug]
      D --> B
      C --> E[Continue]
  `,
  sequence: `
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
  `,
  gantt: `
    gantt
      title A Gantt Diagram
      dateFormat  YYYY-MM-DD
      section Section
      A task           :a1, 2025-07-01, 30d
      Another task     :after a1, 20d
      section Another
      Task in sec      :2025-07-12, 12d
      another task     :24d
  `,
  class: `
    classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal <|-- Zebra
      Animal : +int age
      Animal : +String gender
      Animal: +isMammal()
      Animal: +mate()
      class Duck{
        +String beakColor
        +swim()
        +quack()
      }
      class Fish{
        -int sizeInFeet
        -canEat()
      }
      class Zebra{
        +bool is_wild
        +run()
      }
  `
};

export default function Home() {
  const [currentDiagram, setCurrentDiagram] = useState('flowchart');
  const [theme, setTheme] = useState('default');
  const mermaidRef = useRef();

  const themes = ['default', 'forest', 'dark', 'neutral'];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">React Zoomable Mermaid Demo</h1>
        
        <div className="mb-6 flex gap-4 flex-wrap">
          <select 
            value={currentDiagram} 
            onChange={(e) => setCurrentDiagram(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="flowchart">Flowchart</option>
            <option value="sequence">Sequence Diagram</option>
            <option value="gantt">Gantt Chart</option>
            <option value="class">Class Diagram</option>
          </select>

          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            {themes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => mermaidRef.current?.zoomIn()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom In
          </button>
          <button 
            onClick={() => mermaidRef.current?.zoomOut()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom Out
          </button>
          <button 
            onClick={() => mermaidRef.current?.fit()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fit
          </button>
          <button 
            onClick={() => mermaidRef.current?.center()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Center
          </button>
          <button 
            onClick={() => mermaidRef.current?.resetZoom()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
        
        <div className="border rounded-lg p-4 bg-white h-[600px] dark:bg-gray-800">
          <ZoomableMermaid 
            ref={mermaidRef}
            chart={diagrams[currentDiagram]}
            config={{
              theme: theme,
              securityLevel: 'loose'
            }}
            onError={(error) => console.error('Diagram error:', error)}
          />
        </div>
      </div>
    </div>
  );
}
