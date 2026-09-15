/**
 * Nom du module         : analytics.ts
 * Description           : 
 *   Gère automatiquement l'enregistrement de chaque changement
 *   de page auprès du service Google Analytics.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { useEffect } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import ReactGA from 'react-ga4';
import config from '@/config.yaml';

/**
 * Initialise l'état de la Google Analytics avec le Google ID présent
 * dans le fichier de configuration de l'application.
 */
export function initAnalytics(): void {
  ReactGA.initialize(config.analytics.googleid);
}

/**
 * Composant React qui écoute les changements de localisation du routeur
 * et envoie un événement de type 'pageview' à Google Analytics.
 * 
 * @returns {null} Ce composant n'affiche aucun élément visuel.
 */
export function AnalyticsTracker(): null {
  const current: Location = useLocation();
  useEffect((): void => {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: current.pathname + current.search 
    });
  }, [ current ]);
  return null;
}