import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  withDelay, 
  Easing as ReanimatedEasing,
  interpolate
} from 'react-native-reanimated';
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
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withDelay(delay, 
      withRepeat(
        withSequence(
          withTiming(1, { duration: WAVE_SPEED, easing: ReanimatedEasing.inOut(ReanimatedEasing.sin) }),
          withTiming(0, { duration: WAVE_SPEED, easing: ReanimatedEasing.inOut(ReanimatedEasing.sin) })
        ),
        -1, // Infinite repeat
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(anim.value, [0, 1], [-15, 15]);
    const opacity = interpolate(
      anim.value, 
      [0, 0.5, 1], 
      [isDark ? 0.1 : 0.2, isDark ? 0.4 : 0.6, isDark ? 0.1 : 0.2]
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View style={[
      {
        position: 'absolute',
        left: x,
        top: y,
      },
      animatedStyle
    ]}>
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
