import cn from 'clsx';
import { ElementType, ReactNode, createElement } from 'react';
import { Sprinkles, sprinkles } from '../../styles/sprinkles.css';
import { PolymorphicComponentProps } from '../../types';
import * as styles from './Heading.css';

export type HeadingProps<T extends ElementType> = PolymorphicComponentProps<
  T,
  {
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    fontSize?: Sprinkles['fontSize'];
    color?: Extract<Sprinkles['color'], 'foreground'>;
    children: ReactNode;
  }
>;

export const Heading = <T extends ElementType = 'p'>({
  as,
  fontSize = 'md',
  color = 'foreground',
  ...props
}: HeadingProps<T>) => {
  const component = as || 'h2';
  const { className, ...rest } = props;
  return createElement(component, {
    className: cn(styles.root, sprinkles({ fontSize, color }), className),
    ...rest,
  });
};
