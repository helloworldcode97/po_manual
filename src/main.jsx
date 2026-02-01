import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('Application initializing...');

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  const errorMsg = `Error: ${message} at ${source}:${lineno}:${colno}`;
  console.error(errorMsg);
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h1>Critical Error</h1>
      <p>${errorMsg}</p>
      <p>Please check the browser console for more details.</p>
    </div>`;
  }
};

try {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element #root not found in the DOM.');
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Application render triggered.');
} catch (err) {
  console.error('Render error:', err);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h1>Failed to Start</h1>
      <pre>${err.stack || err.message}</pre>
    </div>`;
  }
}
