import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import './index.css';
import App from './App.tsx';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_URL,
  enabled: import.meta.env.PROD,
  sendDefaultPii: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
