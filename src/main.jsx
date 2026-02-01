import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Add a simple error listener to help debug blank pages
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error('Error during rendering:', error);
  if (document.body) {
    document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;"><h1>Application Error</h1><pre>${error.message}</pre><p>Check the browser console for more details.</p></div>`;
  }
}
