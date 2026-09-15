/**
 * Nom du module         : {{lower_name}}.ts
 * Description           : 
 * 
 * Auteur                : {{user_name}}
 * Date de création      : {{datetime_full}}
 * Dernière modification : {{datetime_full}}
 * Version               : 1.0.0
 * Licence               : {{licence_name}}
 * 
 * Notes                 : 
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * État du store {{title_name}}.
 */
interface {{title_name}}State {
  
}

/**
 * État initial du store {{title_name}}.
 */
const initialState: {{title_name}}State = {
  
};

/**
 * Logique de l'état du store {{title_name}}.
 */
const {{lower_name}}Slice = createSlice({
  name: '{{lower_name}}',
  initialState,
  reducers: {

  }
});

/**
 * Définition des actions du store {{title_name}}.
 */
export const { } = {{lower_name}}Slice.actions;

/**
 * Définition du store {{title_name}}.
 */
export default {{lower_name}}Slice.reducer