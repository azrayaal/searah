import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from '@/routes/AppRouter';
import { LanguageProvider } from '@/lib/i18n';
import '@/styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Outside the router: the chosen language survives navigation, and the provider
        reads it from storage once rather than on every route change. */}
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  </StrictMode>,
);
