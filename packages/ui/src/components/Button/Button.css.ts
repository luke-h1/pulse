import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  backgroundColor: themeVars.color.surfaceStrong,
  color: themeVars.color.foregroundHighContrast,
  borderRadius: tokens.radius.md,
  border: '1px solid transparent',
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
