
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix: Declare Sentry global to avoid TypeScript "Cannot find name" errors
declare const Sentry: any;

// Sentry initialization (Mock DSN for demonstration)
if (typeof Sentry !== 'undefined') {
  Sentry.init({
    dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations: [],
    tracesSampleRate: 1.0,
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
