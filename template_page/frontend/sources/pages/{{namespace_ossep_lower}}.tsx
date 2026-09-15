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

import { useState, useEffect, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './{{lower_name}}.module.scss';

/**
 * Logique de la page {{title_name}}.
 * 
 * @returns {JSX.Element} Le rendu de la page.
 */
export default function {{title_name}}(): JSX.Element {
  const { t, i18n } = useTranslation('pages', { keyPrefix: '{{namespace_dots_lower}}' });
  const navigate = useNavigate();
  const { } = useParams();

  const [ value, setValue ] = useState('');

  useEffect((): void => {
    
  }, [ ]);

  return (
    <main className={styles.container}>
      Bonjour la page {{title_name}} !
    </main>
  );
}