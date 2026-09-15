/**
 * Nom du module         : main.tsx
 * Description           : 
 *   Point d'entrée de l'application, contient les routes et
 *   les imports principaux.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initTheme } from '@/libraries/theme.ts';
import { initLanguage } from '@/libraries/language.ts';
import { initFullscreen } from '@/libraries/fullscreen.ts';
import { loadRoutes, type DynamicRoute } from '@/libraries/routing.ts';
import { initAnalytics, AnalyticsTracker } from '@/libraries/analytics.ts';

/**
 * Injection des fichiers de style.
 */
import '@/styles/fonts.scss';
import '@/styles/globals.scss';
import '@/styles/themes.scss';
import '@/styles/variables.scss';

/**
 * Initialisation des librairies.
 */
initTheme();
initLanguage();
initAnalytics();
initFullscreen();

/**
 * Définition des routes vers les pages.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <Routes>
          {loadRoutes().map((route: DynamicRoute) => (
            <Route key={route.route} path={route.route} element={<route.component />} />
          ))}
        </Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>
);