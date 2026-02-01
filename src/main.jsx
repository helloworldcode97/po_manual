import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('Application initialization started...');
console.log('Environment URL:', window.location.href);

// Global error handler for runtime errors
window.onerror = function(message, source, lineno, colno, error) {
  const errorMsg = `Error: ${message} at ${source}:${lineno}:${colno}`;
  console.error(errorMsg);
  const root = document.getElementById('root');
  if (root && (root.innerHTML === '' || root.innerHTML.includes('Loading application'))) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif; border: 2px solid red;">
      <h1>Critical Runtime Error</h1>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Location:</strong> ${source}:${lineno}:${colno}</p>
      <p><strong>URL:</strong> ${window.location.href}</p>
      <hr/>
      <p>Stack Trace:</p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error ? error.stack : 'No stack available'}</pre>
      <p>Please check the browser console for more details.</p>
    </div>`;
  }
};

try {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Critical: Root element #root not found in the DOM.');
    throw new Error('Root element #root not found in the DOM.');
  }
  console.log('React container #root found.');

  const root = createRoot(container);
  console.log('React root created, starting render...');

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Application render method called.');
} catch (err) {
  console.error('Render error:', err);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif; border: 2px solid red;">
      <h1>Failed to Render Application</h1>
      <p><strong>Error:</strong> ${err.message}</p>
      <p><strong>URL:</strong> ${window.location.href}</p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${err.stack || 'No stack trace available'}</pre>
    </div>`;
  }
}
