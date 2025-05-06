import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Error handling for rendering
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error("Root element not found");
    }

    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    console.log("App rendered successfully");
  } catch (error) {
    console.error("Failed to render app:", error);

    // Display error message in the DOM
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: sans-serif; padding: 20px; text-align: center;">
          <h1 style="color: #e74c3c; margin-bottom: 20px;">Something went wrong</h1>
          <p>We're sorry, but there was an error loading the application.</p>
          <p style="margin-top: 20px; font-family: monospace; background: #f8f8f8; padding: 10px; border-radius: 4px; max-width: 80%; overflow: auto;">
            ${error instanceof Error ? error.message : String(error)}
          </p>
          <button
            style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;"
            onclick="window.location.reload()"
          >
            Reload Page
          </button>
        </div>
      `;
    }
  }
};

// Initialize the app
renderApp();
