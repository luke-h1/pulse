import cn from 'clsx';
import { ElementType, ReactNode, createElement } from 'react';
import { Sprinkles, sprinkles } from '../../styles/sprinkles.css';
import { PolymorphicComponentProps } from '../../types';
import * as styles from './Text.css';

export type TextProps<T extends ElementType> = PolymorphicComponentProps<
  T,
  {
    as?: 'p' | 'span' | 'strong' | 'em' | 'time' | 'figcaption' | 'label';
    fontSize?: Sprinkles['fontSize'];
    fontFamily?: Sprinkles['fontFamily'];
    color?: Extract<
      Sprinkles['color'],
      'foreground' | 'foregroundNeutral' | 'highlight'
    >;
    letterSpacing?: Sprinkles['letterSpacing'];
    textTransform?: Sprinkles['textTransform'];
    children: ReactNode;
  }
>;

export const Text = <T extends ElementType = 'p'>({
  as,
  fontSize = 'md',
  fontFamily = 'sans',
  letterSpacing,
  textTransform,
  color = 'foreground',
  ...props
}: TextProps<T>) => {
  const component = as || 'p';
  const { className, ...rest } = props;
  return createElement(component, {
    className: cn(
      styles.root,
      sprinkles({
        fontSize,
        fontFamily,
        letterSpacing,
        textTransform,
        color,
      }),
      className,
    ),
    ...rest,
  });
};
