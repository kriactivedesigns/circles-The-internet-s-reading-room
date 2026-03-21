import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';

export const ThemeToggle: React.FC = () => {
  const { colors, mode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary.base} strokeWidth="2">
        {mode === 'dark' ? (
          <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        ) : mode === 'light' ? (
          <Path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        )}
      </Svg>
      <Text style={[styles.text, { color: colors.text.primary }]}>
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  text: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
