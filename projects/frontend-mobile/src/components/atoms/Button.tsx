import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle, View } from 'react-native';
import { typography } from '../../theme/typography';
import { radii } from '../../theme/radii';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'brand' | 'white' | 'outline' | 'glass';
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
}

import { GlowEffect } from './GlowEffect';

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'brand',
  style,
  textStyle,
  leftIcon,
  ...props
}) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);

  const showGlow = variant === 'outline' || variant === 'glass';

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      activeOpacity={0.88}
      {...props}
    >
      {showGlow && <GlowEffect style={{ left: '15%', right: '15%' }} />}
      <View style={styles.innerWrapper}>
        {leftIcon}
        <Text style={[styles.textBase, styles[`${variant}Text` as keyof typeof styles], textStyle]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  base: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    fontFamily: typography.families.ui,
    fontSize: 12,
  },
  brand: {
    backgroundColor: colors.primary.base,
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  brandText: { color: colors.text.primary, fontWeight: '600' },

  white: { backgroundColor: colors.text.primary },
  whiteText: { color: colors.background.base, fontWeight: '600' },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.glass,
  },
  outlineText: { color: colors.text.secondary, fontWeight: '500' },

  glass: {
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.glass,
  },
  glassText: { color: colors.text.primary, fontWeight: '500' },
});
