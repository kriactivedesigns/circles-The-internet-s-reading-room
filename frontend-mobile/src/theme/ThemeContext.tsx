import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, Colors } from './colors';
import { View } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: Colors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();

  // Initialize to 'system' by default so it respects the hardware OS setting!
  const [mode, setMode] = useState<ThemeMode>('system');

  // Derive the active styling boolean by evaluating system preference vs explicit user override
  const isDark = mode === 'system' ? systemColorScheme === 'dark' : mode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  // Re-wired the Logo tap functionality to infinitely cycle through the 3 states for testing
  const toggleTheme = () => {
    setMode(prev => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, colors, toggleTheme }}>
      <View style={{ flex: 1, backgroundColor: colors.background.base }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
