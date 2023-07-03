import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  display: 'flex',
  gap: tokens.spacing.sm,
});

export const item = style({
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: tokens.radius.sm,
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
