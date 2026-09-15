/**
 * Nom du module         : {{lower_name}}.tsx
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

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import styles from './{{lower_name}}.module.scss';

/**
 * Logique de la page {{title_name}}.
 */
export default function {{title_name}}() {
  const { t, i18n } = useTranslation('pages', { keyPrefix: '{{namespace_dots_lower}}' });
  const navigate = useNavigate();
  const { } = useParams();

  const [ value, setValue ] = useState('');

  useEffect(() => {
    
  }, [ ]);

  return (
    <main className={styles.container}>
      Bonjour la page {{title_name}} !
    </main>
  );
}