import { keyframes, style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';
import { tokens } from '../../styles/tokens.css';

const slideDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const content = style({
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.md,
  fontSize: tokens.fontSize.sm,
  backgroundColor: themeVars.color.surfaceStrong,
  color: themeVars.color.foregroundHighContrast,
  animationDuration: '250ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  selectors: {
    '&[data-side="top"]': { animationName: slideUp },
    '&[data-side="bottom"]': { animationName: slideDown },
  },
});

export const arrow = style({
  fill: themeVars.color.surfaceStrong,
});
