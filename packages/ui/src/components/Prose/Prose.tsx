import { ReactNode } from 'react';
import * as styles from './Prose.css';

interface Props {
  children: ReactNode;
}

export const Prose = ({ children }: Props) => {
  return <div className={styles.root}>{children}</div>;
};
