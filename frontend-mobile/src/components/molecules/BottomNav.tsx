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
const SHRUNK_HEIGHT = 25;
const FULL_WIDTH = width * 0.70;
const SHRUNK_WIDTH = 110;

interface BottomNavProps {
  routeName: string;
  onTabPress: (name: string) => void;
  scrollY: SharedValue<number>;
}

const TABS = [
  { name: 'Feed', icon: 'home' },
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
      animValue.value = withTiming(1, { duration: 250 });
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
        animValue.value = withTiming(1, { duration: 250 });
      } else if (diff > 8) {
        animValue.value = withTiming(0, { duration: 250 });
      } else if (diff < -8) {
        animValue.value = withTiming(1, { duration: 250 });
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
    transform: [{ scale: interpolate(animValue.value, [0, 1], [0.5, 1]) }],
  }));

  const labelContainerStyle = (isFocused: boolean) => useAnimatedStyle(() => {
    const opacity = interpolate(animValue.value, [0.7, 1], [0, 1]);
    const height = interpolate(animValue.value, [0, 1], [0, 10]); // shrink to 0 height
    return {
      opacity,
      height,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: interpolate(animValue.value, [0, 1], [0, 4]),
    };
  });

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

                <Animated.View style={labelContainerStyle(isFocused)}>
                  <Text numberOfLines={1} style={[
                    styles.navLabel, {
                      color: isFocused ? colors.primary.base : colors.text.secondary
                    }
                  ]}>
                    {tab.name}
                  </Text>
                  {isFocused && (
                    <View style={styles.activeDot} />
                  )}
                </Animated.View>
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
  iconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 2,
  },
  activeDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: colors.primary.base,
    position: 'absolute',
    bottom: -6,
  },
});
