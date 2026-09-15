/**
 * Nom du module         : routing.ts
 * Description           : Gère l'importation automatique de module.
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
 * Type d'un module importé.
 *
 * @template T Type du module exporté par défaut.
 */
export interface Module<T = unknown> {
  default: T;
}

/**
 * Type d'un module chargé.
 *
 * @template T Type du module chargé.
 */
export type LoadedModule<T = unknown> = Record<string, Module<T>>;

/**
 * Format d'un module dynamique.
 *
 * @template T Type du module.
 */
export interface DynamicModule<T = unknown> {
  name: string;
  module: T;
}

/**
 * Fonction permettant de formater le nom du module.
 *
 * @param {string} path Chemin vers le fichier du module.
 * @returns {string} Le nom correctement formaté.
 */
export type ModuleFormatter = (path: string) => string;

/**
 * Charge dynamiquement une liste de modules.
 *
 * @param modules Liste des modules chargés.
 * @param formatter Fonction permettant de déterminer le nom du module.
 * @returns {DynamicModule<T>[]} Les modules chargés.
 */
export function loadModules<T = unknown>(
  modules: LoadedModule<T>,
  formatter: ModuleFormatter
): DynamicModule<T>[] {
  return Object.entries(modules)
    .map(([path, module]): DynamicModule<T> => ({
      name: formatter(path),
      module: module.default
    }));
}