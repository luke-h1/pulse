import { CSSProperties, ReactNode } from 'react';
import { SocialShare } from '../SocialShare/SocialShare';
import * as styles from './Meta.css';

interface MetaProps {
  items: {
    title: ReactNode;
    description: ReactNode;
  }[];
}

export const Meta = ({ items }: MetaProps) => {
  return (
    <dl
      className={styles.root}
      style={
        {
          '--length': items.length,
        } as CSSProperties
      }
    >
      {items &&
        items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.item} key={index}>
            <dt className={styles.title}>{item.title}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      <div className={styles.item}>
        <dt className={styles.title}>Share</dt>{' '}
        <dd>
          <SocialShare />
        </dd>
      </div>
    </dl>
  );
};
