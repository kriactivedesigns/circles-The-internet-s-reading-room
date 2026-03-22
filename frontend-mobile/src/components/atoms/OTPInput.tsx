import React, { useRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 4, value, onChange }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange(finalValue);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => {
            if (ref) inputs.current[i] = ref;
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          value={value[i] || ''}
          placeholder="·"
          placeholderTextColor={colors.text.muted}
          selectionColor={colors.primary.base}
        />
      ))}
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  input: {
    width: 60,
    height: 70,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.glassLight,
    borderRadius: 16,
    color: colors.text.primary,
    fontFamily: typography.families.ui,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
