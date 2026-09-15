/**
 * Nom du module         : screen.ts
 * Description           : Gère l'état de l'écran.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

/**
 * Vérifie si la fenêtre du navigateur est orientée verticalement (portrait).
 * 
 * @returns {boolean} Si la fenêtre du navigateur est orientée verticalement.
 */
export function isVertical(): boolean {
  return window.innerHeight > window.innerWidth;
}