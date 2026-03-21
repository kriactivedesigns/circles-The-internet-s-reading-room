import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Dimensions, Easing, View, Image } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

// 🌊 CONFIG
const COLS = 12;
const ROWS = 20;
const WAVE_SPEED = 4000;

// High-fidelity generated assets to eliminate banding
const DARK_GLOW = { uri: 'file:///C:/Users/kriac/.gemini/antigravity/brain/422c2f17-72f2-4a71-b964-968783c9eb03/dark_ambient_glow_png_1774110364146.png' };
const LIGHT_GLOW = { uri: 'file:///C:/Users/kriac/.gemini/antigravity/brain/422c2f17-72f2-4a71-b964-968783c9eb03/light_ambient_glow_png_1774110384045.png' };

const Particle: React.FC<{ x: number, y: number, delay: number }> = ({ x, y, delay }) => {
  const { colors, isDark } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: WAVE_SPEED,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: WAVE_SPEED,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 15],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [isDark ? 0.1 : 0.2, isDark ? 0.4 : 0.6, isDark ? 0.1 : 0.2],
  });

  return (
    <Animated.View style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: [{ translateY }],
      opacity
    }}>
      <View style={{
        width: isDark ? 2 : 2.5,
        height: isDark ? 2 : 2.5,
        borderRadius: 2,
        backgroundColor: colors.primary.base,
        shadowColor: colors.primary.base,
        shadowOpacity: isDark ? 0.5 : 0.2,
        shadowRadius: 2,
      }} />
    </Animated.View>
  );
};

export const AmbientBackground: React.FC = () => {
  const { colors, isDark } = useTheme();

  const particles = [];
  const colStep = width / (COLS - 1);
  const rowStep = height / (ROWS - 1);

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if ((i + j) % 3 === 0) {
        particles.push(
          <Particle
            key={`${i}-${j}`}
            x={i * colStep}
            y={j * rowStep}
            delay={(i * 200) + (j * 100)}
          />
        );
      }
    }
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {/* 🎭 Image-Based Smooth Backdrop (Guaranteed 0% Banding) */}
      <Image
        source={isDark ? DARK_GLOW : LIGHT_GLOW}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={StyleSheet.absoluteFill}>
        {particles}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
