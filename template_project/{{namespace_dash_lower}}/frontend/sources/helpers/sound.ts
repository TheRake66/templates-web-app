/**
 * Nom du module         : sound.ts
 * Description           : Gère les flux audio.
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
 * Joue un effet sonore, permet des lectures simultanées.
 * 
 * @param {HTMLAudioElement} sound L'élément audio HTML à jouer.
 * @param {number} volume Le volume de lecture, de 0.0 à 1.0. Par défaut à 1.
 * @param {boolean} loop Si le son doit boucler en continu. Par défaut à false.
 * @returns {HTMLAudioElement} Un clone de l'élément audio en cours de lecture.
 */
export function playSound(
  sound: HTMLAudioElement,
  volume: number = 1,
  loop: boolean = false): HTMLAudioElement {
  const clone: HTMLAudioElement = sound.cloneNode() as HTMLAudioElement;
  clone.loop = loop;
  clone.volume = volume;
  clone.play().catch(error => console.error(error));
  return clone;
}