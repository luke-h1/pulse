import cn from 'clsx';
import { ElementType, createElement } from 'react';
import { Sprinkles, sprinkles } from '../../styles/sprinkles.css';
import { PolymorphicComponentProps } from '../../types';

export type BoxProps<T extends ElementType> = PolymorphicComponentProps<
  T,
  Sprinkles
>;

export const Box = <T extends ElementType = 'div'>({
  as,
  position,
  className,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingX,
  paddingY,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  display,
  flexDirection,
  alignItems,
  justifyContent,
  placeItems,
  flexShrink,
  flexGrow,
  gap,
  columnGap,
  rowGap,
  columns,
  gridTemplateColumns,
  width,
  maxWidth,
  height,
  aspectRatio,
  float,
  textAlign,
  ...restProps
}: BoxProps<T>) => {
  const atomClasses = cn(
    sprinkles({
      position,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingX,
      paddingY,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      display,
      flexDirection,
      alignItems,
      justifyContent,
      placeItems,
      flexShrink,
      flexGrow,
      gap,
      columnGap,
      rowGap,
      columns,
      gridTemplateColumns,
      width,
      maxWidth,
      height,
      aspectRatio,
      float,
      textAlign,
    }),
    className,
  );
  const component = as || 'div';
  return createElement(component, { className: atomClasses, ...restProps });
};
