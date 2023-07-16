import { ReactNode } from 'react';
import * as styles from './Filters.css';

interface Props {
  children: ReactNode;
}

export const Filters = ({ children }: Props) => {
  return (
    <fieldset className={styles.root}>
      <legend className={styles.legend}>Filter</legend>
      <div className={styles.items}>{children}</div>
    </fieldset>
  );
};
