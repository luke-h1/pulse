import cn from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import * as styles from './Link.css';

export type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
};

export const Link = (props: LinkProps) => {
  const { children, className } = props;
  return (
    <NextLink {...props} className={cn(styles.root, className)}>
      {children}
    </NextLink>
  );
};
