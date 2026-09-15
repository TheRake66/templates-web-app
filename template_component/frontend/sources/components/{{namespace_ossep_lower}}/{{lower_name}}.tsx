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
 * Propriétés du composant {{title_name}}.
 */
interface {{title_name}}Props {
  
}

/**
 * Logique du composant {{title_name}}.
 */
export default function {{title_name}}({ }: {{title_name}}Props) {
  const { t, i18n } = useTranslation('components', { keyPrefix: '{{namespace_dots_lower}}' });
  const navigate = useNavigate();
  const { } = useParams();

  const [ value, setValue ] = useState('');

  useEffect(() => {
    
  }, [ ]);

  return (
    <div className={styles.container}>
      Bonjour le composant {{title_name}} !
    </div>
  );
}