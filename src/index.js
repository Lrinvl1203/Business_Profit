import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StagewiseToolbar } from '@stagewise/toolbar-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize toolbar separately in development mode
if (process.env.NODE_ENV === 'development') {
  document.addEventListener('DOMContentLoaded', () => {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root'; // Ensure a unique ID
    document.body.appendChild(toolbarRoot);
    const toolbarConfig = { plugins: [] }; // Add your custom plugins here
    ReactDOM.createRoot(toolbarRoot).render(
      <React.StrictMode>
        <StagewiseToolbar config={toolbarConfig} />
      </React.StrictMode>
    );
  });
} 