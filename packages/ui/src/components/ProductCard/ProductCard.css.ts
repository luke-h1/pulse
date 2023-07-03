import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const root = style({
  position: 'relative',
  display: 'block',
  ':focus': {
    outline: 'transparent',
  },
  ':focus-visible': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    outlineColor: themeVars.color.outline,
  },
});

export const info = style({
  position: 'relative',
});

export const labelArrow = style({
  color: themeVars.color.highlight,
  opacity: 0,
  transition: 'opacity ease-in-out 0.2s',
  selectors: {
    [`${root}:hover &`]: {
      opacity: 1,
    },
  },
});
