import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: tokens.spacing.md,
  borderBottom: '1px solid',
  borderColor: themeVars.color.borderNeutral,
  paddingTop: tokens.spacing.md,
  paddingBottom: tokens.spacing.md,
});

export const item = style({
  display: 'grid',
});

export const title = style({
  fontVariationSettings: "'wght' 650",
});
