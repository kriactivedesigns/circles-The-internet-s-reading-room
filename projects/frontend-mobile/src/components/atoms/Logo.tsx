import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

interface LogoProps {
  variant?: 'xs' | 'sm' | 'nav' | 'md' | 'lg' | 'xl' | 'signIn';
}

const LOGO_SIZES = {
  xs: { size: 20, inset1: 3, inset2: 6, dotSize: 3, stroke: 0.6 },
  sm: { size: 32, inset1: 4, inset2: 9, dotSize: 5, stroke: 0.8 },
  nav: { size: 27, inset1: 4, inset2: 8, dotSize: 4.5, stroke: 0.8 },
  md: { size: 48, inset1: 6, inset2: 13, dotSize: 7, stroke: 0.9 },
  signIn: { size: 56, inset1: 8, inset2: 18, dotSize: 8, stroke: 1.0 },
  lg: { size: 72, inset1: 9, inset2: 20, dotSize: 10, stroke: 1.0 },
  xl: { size: 96, inset1: 12, inset2: 27, dotSize: 14, stroke: 1.2 },
};

export const Logo: React.FC<LogoProps> = ({ variant = 'xl' }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const specs = LOGO_SIZES[variant];
  const ring1Size = specs.size - (specs.inset1 * 2);
  const ring2Size = specs.size - (specs.inset2 * 2);

  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createRipple = (animValue: Animated.Value) => {
      return Animated.loop(
        Animated.timing(animValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.bezier(0.25, 1, 0.5, 1),
          useNativeDriver: true,
        })
      );
    };

    createRipple(ripple1).start();
    const ring2Timeout = setTimeout(() => {
      createRipple(ripple2).start();
    }, 1500);

    return () => clearTimeout(ring2Timeout);
  }, [ripple1, ripple2]);

  const getRippleStyle = (animValue: Animated.Value, baseSize: number) => {
    const scale = animValue.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
    const opacity = animValue.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] });
    return {
      width: baseSize, height: baseSize, opacity, transform: [{ scale }],
    };
  };

  return (
    <View style={[styles.container, { width: specs.size, height: specs.size }]}>
      <View style={[styles.ring, { width: specs.size, height: specs.size, borderWidth: specs.stroke, opacity: 0.3 }]} />

      <Animated.View style={[styles.ring, { borderWidth: specs.stroke }, getRippleStyle(ripple1, ring1Size)]} />
      <Animated.View style={[styles.ring, { borderWidth: specs.stroke }, getRippleStyle(ripple2, ring2Size)]} />

      <View style={[styles.dot, { width: specs.dotSize, height: specs.dotSize, shadowRadius: specs.dotSize }]} />
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  ring: { position: 'absolute', borderRadius: 9999, borderColor: colors.primary.base },
  dot: { position: 'absolute', borderRadius: 9999, backgroundColor: colors.primary.base, shadowColor: colors.primary.base, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, elevation: 8 },
});
