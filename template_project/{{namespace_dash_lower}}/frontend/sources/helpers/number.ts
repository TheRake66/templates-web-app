/**
 * Nom du module         : number.ts
 * Description           : Gère la conversion de nombres.
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
const defaultLang: string = config.default.language;

/**
 * Formate un nombre en chaîne de caractères selon la langue spécifiée
 * ou de la langue par défaut de l'application.
 * 
 * @param {number} amount La valeur numérique à formater.
 * @param {string} lang Le code de langue optionnel (ex: 'fr-FR', 'en-US').
 * @returns {string} Le nombre formaté sous forme de chaîne de caractères.
 */
export function formatNumber(amount: number, lang: string | null = null): string {
  return new Intl.NumberFormat(lang ?? defaultLang).format(amount);
}