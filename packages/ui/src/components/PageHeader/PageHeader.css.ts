import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  paddingTop: tokens.spacing.xl,
  paddingBottom: tokens.spacing.xl,
  paddingRight: tokens.spacing.md,
  paddingLeft: tokens.spacing.md,
  backgroundColor: themeVars.color.pageFaint,
});
