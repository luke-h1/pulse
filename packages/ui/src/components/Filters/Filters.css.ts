import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: tokens.spacing.sm,
  borderBottom: `1px solid ${themeVars.color.borderNeutral}`,
});

export const legend = style({
  fontWeight: tokens.fontWeight.bold,
});

export const items = style({
  display: 'flex',
  gap: tokens.spacing.md,
});
