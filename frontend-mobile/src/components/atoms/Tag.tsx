import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface TagProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'success' | 'warning' | 'tech';
  onPress?: () => void;
  style?: any;
}

import { GlowEffect } from './GlowEffect';

export const Tag: React.FC<TagProps> = ({ label, variant = 'ghost', onPress, style }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, variant);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors, variant: 'primary' | 'ghost' | 'success' | 'warning' | 'tech') => {
  let bg = 'rgba(255, 255, 255, 0.04)';
  let borderColor = 'rgba(255, 255, 255, 0.15)';
  let textColor = 'rgba(255, 255, 255, 0.60)';
  let borderWidth = 0.5;
  let customFontFamily: any = typography.families.ui;
  let customFontWeight: any = '700';

  switch (variant) {
    case 'primary':
      bg = 'rgba(92, 148, 233, 0.12)';
      borderColor = 'rgba(92, 148, 233, 0.30)';
      textColor = colors.primary.base;
      break;
    case 'tech':
      bg = 'rgba(92, 148, 233, 0.12)';
      borderColor = colors.primary.base;
      textColor = colors.primary.base;
      borderWidth = 1;
      customFontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';
      customFontWeight = '900';
      break;
    case 'success':
      bg = 'rgba(16, 185, 129, 0.12)';
      borderColor = 'rgba(16, 185, 129, 0.25)';
      textColor = colors.status.success;
      break;
    case 'warning':
      bg = 'rgba(245, 158, 11, 0.08)';
      borderColor = 'rgba(245, 158, 11, 0.4)';
      borderWidth = 1;
      textColor = colors.status.warn;
      break;
    case 'ghost':
    default:
      break;
  }

  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 9999,
      backgroundColor: bg,
      borderWidth: borderWidth,
      borderColor: borderColor,
    },
    text: {
      fontFamily: customFontFamily,
      fontSize: 8.5,
      fontWeight: customFontWeight,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: textColor,
    },
  });
};
