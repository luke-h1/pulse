import { ReactNode } from 'react';
import * as styles from './VisuallyHidden.css';

interface VisuallyHiddenProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

export const VisuallyHidden = ({
  as: Component = 'span',
  children,
}: VisuallyHiddenProps) => {
  return <Component className={styles.root}>{children}</Component>;
};
