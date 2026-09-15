/**
 * Nom du module         : theme.ts
 * Description           : Gère le thème des couleurs.
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
const defaultTheme: string = config.default.theme;
const storageKey: string = config.storage.theme;

/**
 * Initialise le thème des couleurs en récupérant la valeur enregistrée 
 * ou celle défaut dans le fichier de configuration de l'application.
 */
export function initTheme(): void {
  const name: string = getTheme();
  document.body.setAttribute('data-theme', name);
}

/**
 * Modifie le thème actif des couleurs .
 * 
 * @param {string} name Le nouveau thème à appliquer.
 */
export function setTheme(name: string): void {
  document.body.setAttribute('data-theme', name);
  localStorage.setItem(storageKey, name);
}

/**
 * Récupère le thème actif des couleurs.
 * 
 * @returns {string} Le thème actif des couleur.
 */
export function getTheme(): string {
  return localStorage.getItem(storageKey) ?? defaultTheme;
}