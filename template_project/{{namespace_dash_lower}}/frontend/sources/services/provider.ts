/**
 * Nom du module         : backend.ts
 * Description           : Gère le service des états partagés.
 * 
 * Auteur                : TheRake66
 * Date de création      : 2026-08-28 04:01:51
 * Dernière modification : 2026-08-28 04:01:51
 * Version               : 1.0.0
 * Licence               : GPL-3.0
 * 
 * Notes                 : 
 */

import { useDispatch, useSelector } from 'react-redux'
import { configureStore, type Reducer } from '@reduxjs/toolkit';
import { loadReducers } from '@/libraries/reducer.ts';

/**
 * Objet contenant les états partagés.
 */
export const store = configureStore({
  reducer: loadReducers() as unknown as { [x: string]: Reducer; }
});

/**
 * Type de l'état global.
 */
type RootState = ReturnType<typeof store.getState>;

/**
 * Type de la fonction dispatch.
 */
type AppDispatch = typeof store.dispatch;

/**
 * Hook permettant de dispatcher des actions.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Hook permettant d'accéder à l'état global.
 */
export const useAppSelector = useSelector.withTypes<RootState>();