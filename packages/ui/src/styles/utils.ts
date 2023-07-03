import { StyleRule } from '@vanilla-extract/css';
import { Properties, SimplePseudos } from 'csstype';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

export const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1024,
};

export type Breakpoint = keyof typeof breakpoints;

export const queries = mapValues(
  omit(breakpoints, 'sm'),
  (bp: number) => `screen and (min-width: ${bp}px)`,
);

export type Query = keyof typeof queries;

const makeMediaQuery =
  (breakpoint: Query) => (styles: Properties<string | number>) =>
    !styles || Object.keys(styles).length === 0
      ? {}
      : {
          [queries[breakpoint]]: styles,
        };

const mediaQuery = {
  md: makeMediaQuery('md'),
  lg: makeMediaQuery('lg'),
};

type CSSProps = Properties<string | number> & {
  [T in SimplePseudos]?: Properties<string | number>;
};

interface ResponsiveStyle {
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
}

export const responsiveStyle = ({ sm, md, lg }: ResponsiveStyle): StyleRule => {
  const mobileStyles = omit(sm, '@media');

  const tabletStyles = !md || isEqual(md, mobileStyles) ? null : md;

  const stylesBelowDesktop = tabletStyles || mobileStyles;

  const desktopStyles = !lg || isEqual(lg, stylesBelowDesktop) ? null : lg;

  const hasMediaQueries = tabletStyles || desktopStyles;
  return {
    ...mobileStyles,
    ...(hasMediaQueries
      ? {
          '@media': {
            ...(tabletStyles ? mediaQuery.md(tabletStyles) : {}),
            ...(desktopStyles ? mediaQuery.lg(desktopStyles) : {}),
          },
        }
      : {}),
  };
};

export const mapToProperty =
  <TProperty extends keyof Properties<string | number>>(
    property: TProperty,
    breakpoint?: Breakpoint,
  ) =>
  (value: string | number) => {
    const styleRule = { [property]: value };

    return breakpoint
      ? responsiveStyle({ [breakpoint]: styleRule })
      : styleRule;
  };
