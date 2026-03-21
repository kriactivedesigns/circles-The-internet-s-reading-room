import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ label }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.line} />
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.glass,
  },
  label: {
    fontSize: 8.5,
    fontWeight: '500',
    color: colors.text.muted,
    paddingHorizontal: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: typography.families.ui,
  }
});
