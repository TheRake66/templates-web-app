/**
 * Nom du module         : time.ts
 * Description           : Gère le format de temps.
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
 * Format de temps.
 */
export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Convertit un nombre total de secondes en une structure de temps découpée 
 * en heures, minutes et secondes.
 * 
 * @param {number} seconds Le nombre de secondes à convertir.
 * @returns {Time} Un objet contenant les heures, minutes et secondes.
 */
export function parseTime(seconds: number): Time {
  const total: number = Math.floor(seconds);
  return { 
    hours: Math.floor(total / 3600), 
    minutes: Math.floor((total % 3600) / 60), 
    seconds: total % 60 
  } as Time;
}

/**
 * Formate un objet ou un nombre de secondes en une chaîne de caractères
 * au format HH:MM:SS avec un zéro initial si nécessaire.
 * 
 * @param {Time | number} value Un objet ou un nombre de secondes brut.
 * @returns {string} Le temps formaté sous la forme "HH:MM:SS".
 */
export function formatTime(time: Time): string;
export function formatTime(seconds: number): string;
export function formatTime(value: Time | number): string {
  const obj: Time = typeof value === 'number' ? parseTime(value) : value;
  const pad = (value: number): string => value.toString().padStart(2, '0');
  return `${pad(obj.hours)}:${pad(obj.minutes)}:${pad(obj.seconds)}`;
}