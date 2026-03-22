import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

import { GlowEffect } from './GlowEffect';

export const Tag: React.FC<TagProps> = ({ label, selected = false, onPress }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, selected);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <GlowEffect style={{ left: '20%', right: '20%' }} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors, selected: boolean) => StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: selected ? colors.primary.base : 'rgba(255, 255, 255, 0.05)',
    borderWidth: 0.5,
    borderColor: selected ? colors.primary.base : colors.border.glass,
  },
  text: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '500',
    color: selected ? colors.text.primary : colors.text.secondary,
  },
});
