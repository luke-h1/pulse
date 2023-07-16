import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const root = style({
  color: 'inherit',
  textDecoration: 'underline',
  textDecorationColor: themeVars.color.highlight,
  textDecorationThickness: 2,
  ':hover': {
    textDecorationColor: themeVars.color.border,
  },
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
