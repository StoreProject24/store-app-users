import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js';
import { PostHogErrorBoundary, PostHogProvider } from '@posthog/react';
import './index.css';
import App from './App.tsx';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enabled: import.meta.env.PROD,
  sendDefaultPii: true
});


// posthog.init(import.meta.env.VITE_POSTHOG_KEY ?? '', {
//   api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
//   defaults: '2026-01-30',
//   autocapture: false,        // control manual para eventos limpios
//   capture_pageview: false,   // los pageviews los manejamos manualmente por ruta
//   persistence: 'localStorage',
//   loaded: (ph) => {
//     // En desarrollo desactivamos el envío real para no contaminar datos
//     if (import.meta.env.DEV) ph.opt_out_capturing()
//   },
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <PostHogProvider client={posthog}> */}
      {/* <PostHogErrorBoundary> */}
        <App />
      {/* </PostHogErrorBoundary> */}
    {/* </PostHogProvider> */}
  </StrictMode>
);
