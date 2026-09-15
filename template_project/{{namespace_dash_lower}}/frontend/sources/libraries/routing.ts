/**
 * Nom du module         : routing.ts
 * Description           : Gère l'importation automatique des routes.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { loadModules, type DynamicModule } from '@/libraries/autoloader.ts';
import type { ComponentType } from 'react';
import config from '@/config.yaml';

// On charge la configuration.
const rootRoute: string = config.routes.root;
const unknownRoute: string = config.routes.unknown;

/**
 * Format des routes dynamiques.
 */
export interface DynamicRoute {
  route: string;
  component: ComponentType;
}

/**
 * Charge la liste de toutes les routes.
 * 
 * @returns {DynamicRoute[]} Les routes chargées.
 */
export function loadRoutes(): DynamicRoute[] {
  return loadModules<ComponentType>('@/pages/**/*.tsx', getRoute)
    .map(({ name, module }: DynamicModule<ComponentType>) => ({
      route: name,
      component: module
    }));
}

/**
 * Retourne la route en fonction d'un chemin de fichier.
 * 
 * @param {string} path Le chemin du fichier.
 * @returns {string} La route.
 */
function getRoute(path: string): string {
  let url: string = path
    .replace(/^\/pages/, '')
    .replace(/\.tsx$/, '')
    .replace('/$', '/:');
  return url == rootRoute ? '/' : 
         url == unknownRoute ? '*' : url;
}