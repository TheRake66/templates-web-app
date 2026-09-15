/**
 * Nom du module         : fullscreen.ts
 * Description           : Gère le mode plein écran.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import config from '@/config.yaml';

// On charge la configuration.
const defaultState: string = config.default.fullscreen;
const storageKey: string = config.storage.fullscreen;

/**
 * Initialise l'état du mode plein écran au chargement de l'application
 * en fonction des préférences stockées ou celle par défaut dans le fichier de
 * configuration de l'application.
 */
export function initFullscreen(): void {
  const fullscreen: string = localStorage.getItem(storageKey) ?? defaultState;
  if (fullscreen && !isFullscreen()) {
    const handler = (): void => {
      requestFullscreen();
      window.removeEventListener('click', handler);
    };
    window.addEventListener('click', handler);
  }
}

/**
 * Demande le passage de l'élément racine en mode plein écran.
 */
export function requestFullscreen(): void {
  if (!isFullscreen())
    document.documentElement.requestFullscreen();
  localStorage.setItem(storageKey, '');
}

/**
 * Quitte le mode plein écran.
 */
export function exitFullscreen(): void {
  if (isFullscreen()) 
    document.exitFullscreen();
  localStorage.removeItem(storageKey)
}

/**
 * Vérifie si l'application est actuellement en mode plein écran.
 * 
 * @returns {boolean} Si un élément est en plein écran.
 */
export function isFullscreen(): boolean {
  return document.fullscreenElement !== null
}