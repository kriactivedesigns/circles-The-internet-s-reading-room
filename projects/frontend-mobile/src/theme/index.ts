import { darkColors, lightColors, Colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';

export {
  darkColors,
  lightColors,
  spacing,
  radii,
  typography,
};

export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Typography = typeof typography;
export type { Colors };
