/**
 * Nom du module         : reducer.ts
 * Description           : Gère l'importation automatique des états.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { loadModules, type DynamicModule, type LoadedModule, type Module } from '@/libraries/autoloader.ts';
import type { Reducer } from '@reduxjs/toolkit';

/**
 * Format d'un reducer dynamique.
 */
export interface DynamicReducer {
  name: string;
  reducer: Reducer;
}

/**
 * Charge automatiquement tous les reducers.
 *
 * @returns {DynamicReducer[]} Les reducers chargés.
 */
export function loadReducers(): DynamicReducer[] {    
  const modules: LoadedModule<Reducer> = 
    import.meta.glob<Module<Reducer>>('@/pages/**/*.tsx', { eager: true });
  return loadModules(modules, getName)
    .map(({ name, module }: DynamicModule<Reducer>) => ({
      name: name,
      reducer: module
    } as DynamicReducer));
}

/**
 * Retourne le nom d'un reducer à partir de son chemin.
 *
 * @param {string} path Le chemin du fichier.
 * @returns {string} Le nom du reducer.
 */
function getName(path: string): string {
  return path
    .split('/').at(-1)
    ?.replace(/\.slice.ts$/, '')
    ?? '';
}