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
 * @param glob Motif des modules à charger.
 * @param formatter Fonction permettant de déterminer le nom du module.
 * @returns {DynamicModule<T>[]} Les modules chargés.
 */
export function loadModules<T = unknown>(
  glob: string, 
  formatter: ModuleFormatter
): DynamicModule<T>[] {
  const modules: Record<string, Module<T>> = 
    import.meta.glob<Module<T>>(glob, { eager: true });
  return Object.entries(modules)
    .map(([path, module]): DynamicModule<T> => ({
      name: formatter(path),
      module: module.default
    }));
}