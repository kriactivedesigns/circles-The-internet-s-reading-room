import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radii } from '../../theme/radii';

interface InputProps extends TextInputProps {}

export const Input: React.FC<InputProps> = (props) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TextInput 
      style={[styles.input, props.style]} 
      placeholderTextColor={colors.text.muted}
      {...props} 
    />
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.glass,
    borderRadius: radii.pill,
    color: colors.text.primary,
    fontFamily: typography.families.ui,
    fontSize: 11.5,
  }
});
