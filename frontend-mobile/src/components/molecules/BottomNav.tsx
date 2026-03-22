import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  useAnimatedReaction,
  interpolate,
  SharedValue
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { GlowEffect } from '../atoms/GlowEffect';

const { width } = Dimensions.get('window');

const FULL_HEIGHT = 70;
const SHRUNK_HEIGHT = 40;
const FULL_WIDTH = width * 0.85;
const SHRUNK_WIDTH = 155;

interface BottomNavProps {
  routeName: string;
  onTabPress: (name: string) => void;
  scrollY: SharedValue<number>;
}

const TABS = [
  { name: 'Feed', icon: 'home' },
  { name: 'Orbit', icon: 'users' },
  { name: 'Shelf', icon: 'bookmark' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ routeName, onTabPress, scrollY }) => {
  const { colors, isDark } = useTheme();
  const background = colors.background.surface;
  const styles = getStyles(colors, background, isDark);

  const animValue = useSharedValue(1); // 1 = expanded, 0 = shrunk
  const fadeValue = useSharedValue(1); // 1 = visible, 0 = hidden
  const lastScrollY = useSharedValue(0);

  // Dissolve effect when navigating away from MainTabs
  useEffect(() => {
    const isMainTab = TABS.some(t => t.name === routeName);
    fadeValue.value = withTiming(isMainTab ? 1 : 0, { duration: 300 });

    // Restore expansion when leaving Feed tab
    if (routeName !== 'Feed') {
      animValue.value = withSpring(1, { damping: 15, stiffness: 100 });
    }
  }, [routeName]);

  // Scroll reaction for Feed tab shrink/expand
  useAnimatedReaction(
    () => scrollY.value,
    (current, previous) => {
      // Only run on Feed tab
      if (routeName !== 'Feed') return;
      if (!previous) return;

      const diff = current - lastScrollY.value;

      if (current < 40) {
        animValue.value = withSpring(1, { damping: 15, stiffness: 100 });
      } else if (diff > 8) {
        animValue.value = withSpring(0, { damping: 15, stiffness: 100 });
      } else if (diff < -8) {
        animValue.value = withSpring(1, { damping: 15, stiffness: 100 });
      }
      
      lastScrollY.value = current;
    },
    [routeName]
  );

  const outerStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
    transform: [{ translateY: interpolate(fadeValue.value, [0, 1], [20, 0]) }]
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(animValue.value, [0, 1], [SHRUNK_WIDTH, FULL_WIDTH]),
    height: interpolate(animValue.value, [0, 1], [SHRUNK_HEIGHT, FULL_HEIGHT]),
  }));

  const tabContentStyle = useAnimatedStyle(() => ({
    gap: interpolate(animValue.value, [0, 1], [16, 60]),
    paddingHorizontal: interpolate(animValue.value, [0, 1], [12, 20]),
  }));

  const iconContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(animValue.value, [0, 1], [0.85, 1]) }],
  }));

  const labelStyle = (isFocused: boolean) => useAnimatedStyle(() => {
    const opacity = interpolate(animValue.value, [0.7, 1], [0, 1]);
    const height = interpolate(animValue.value, [0.7, 1], [0, 12]);
    return {
      opacity,
      height,
      marginTop: interpolate(animValue.value, [0, 1], [0, 4]),
      color: isFocused ? colors.primary.base : colors.text.secondary,
    };
  });

  const activeDotStyle = useAnimatedStyle(() => ({
    bottom: interpolate(animValue.value, [0, 1], [-2, -8]),
    opacity: interpolate(animValue.value, [0.7, 1], [0, 1]),
  }));

  const getIcon = (name: string, focused: boolean) => {
    const color = focused ? colors.primary.base : colors.text.secondary;
    const size = 24;
    switch (name) {
      case 'Feed':
        return (
          <Svg width={size} height={size} stroke={color} strokeWidth="2" fill="none" viewBox="0 0 24 24">
            <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </Svg>
        );
      case 'Orbit':
        return (
          <Svg width={size} height={size} stroke={color} strokeWidth="2" fill="none" viewBox="0 0 24 24">
            <Path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </Svg>
        );
      case 'Shelf':
        return (
          <Svg width={size} height={size} stroke={color} strokeWidth="2" fill="none" viewBox="0 0 24 24">
            <Path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.outerContainer, outerStyle]}>
      <Animated.View style={[styles.container, containerStyle]}>
        <GlowEffect style={{ left: '10%', right: '10%' }} />
        <Animated.View style={[styles.tabContent, tabContentStyle]}>
          {TABS.map((tab) => {
            const isFocused = routeName === tab.name;

            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => onTabPress(tab.name)}
                style={styles.navItem}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.iconContainer, iconContainerStyle]}>
                  {getIcon(tab.name, isFocused)}
                </Animated.View>

                <Animated.Text numberOfLines={1} style={[styles.navLabel, labelStyle(isFocused)]}>
                  {tab.name}
                </Animated.Text>

                {isFocused && (
                  <Animated.View style={[styles.activeDot, activeDotStyle]} />
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const getStyles = (colors: Colors, background: string, isDark: boolean) => StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    zIndex: 100,
  },
  container: {
    backgroundColor: background,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border.glass,
    elevation: 4,
    shadowColor: isDark ? '#000' : '#888',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.4 : 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navLabel: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activeDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: colors.primary.base,
    position: 'absolute',
  },
});
