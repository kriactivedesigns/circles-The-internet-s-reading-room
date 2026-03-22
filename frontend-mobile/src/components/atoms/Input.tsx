import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radii } from '../../theme/radii';

interface InputProps extends TextInputProps {
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ rightElement, style, ...props }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <TextInput 
        style={[styles.input, style, rightElement ? { paddingRight: 60 } : null]} 
        placeholderTextColor={colors.text.muted}
        {...props} 
      />
      {rightElement && (
        <View style={styles.rightElement}>
          {rightElement}
        </View>
      )}
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
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
  },
  rightElement: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  }
});
