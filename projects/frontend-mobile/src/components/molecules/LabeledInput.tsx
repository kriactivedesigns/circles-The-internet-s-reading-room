import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../atoms/Input';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface LabeledInputProps extends React.ComponentProps<typeof Input> {
  label: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...props }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input {...props} />
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  label: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingLeft: 12,
  },
});
