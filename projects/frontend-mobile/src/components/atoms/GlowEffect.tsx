import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlowEffectProps {
  style?: ViewStyle;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ style }) => {
  return (
    <LinearGradient
      colors={['transparent', '#5c94e9a6', 'transparent']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.glow, style]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: 1,
    zIndex: 10,
  },
});
