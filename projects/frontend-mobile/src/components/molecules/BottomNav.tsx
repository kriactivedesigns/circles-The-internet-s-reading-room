import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');

// 📐 SCALE: Calibrated to match user's manual height and width preferences
const FULL_HEIGHT = 70;
const SHRUNK_HEIGHT = 40; // User set in manual edit
const FULL_WIDTH = width * 0.85;
const SHRUNK_WIDTH = 140; // User set in manual edit

interface ExtendedBottomNavProps extends BottomTabBarProps {
  scrollY: Animated.Value;
}

export const BottomNav: React.FC<ExtendedBottomNavProps> = ({ state, descriptors, navigation, scrollY }) => {
  const { colors } = useTheme();
  const background = colors.background.surface;
  const styles = getStyles(colors, background);

  // Animation values
  const lastScrollY = useRef(0);
  const animValue = useRef(new Animated.Value(1)).current; // 1 = full, 0 = shrunk

  // 🔄 RESTORE ON NAVIGATION: Ensure the bar is full when switching to non-Feed tabs
  useEffect(() => {
    const activeRouteName = state.routes[state.index].name;
    if (activeRouteName !== 'Feed') {
      Animated.spring(animValue, {
        toValue: 1,
        friction: 8,
        tension: 60,
        useNativeDriver: false,
      }).start();
    }
  }, [state.index]);

  useEffect(() => {
    if (!scrollY) return;

    const listenerId = scrollY.addListener(({ value }) => {
      // Only respond to scroll if we are on the Feed tab
      const activeRouteName = state.routes[state.index].name;
      if (activeRouteName !== 'Feed') return;

      const diff = value - lastScrollY.current;

      if (value < 40) {
        Animated.spring(animValue, {
          toValue: 1,
          friction: 8,
          tension: 60,
          useNativeDriver: false,
        }).start();
      } else if (diff > 8) {
        Animated.spring(animValue, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: false,
        }).start();
      } else if (diff < -8) {
        Animated.spring(animValue, {
          toValue: 1,
          friction: 8,
          tension: 60,
          useNativeDriver: false,
        }).start();
      }

      lastScrollY.current = value;
    });

    return () => scrollY.removeListener(listenerId);
  }, [scrollY, state.index]);

  // 📐 LAYOUT INTERPOLATIONS
  const navWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SHRUNK_WIDTH, FULL_WIDTH],
  });

  const navHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SHRUNK_HEIGHT, FULL_HEIGHT],
  });

  const iconScale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  const itemGap = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 64], // Restored from user's manual set [0, 64] to have at least some gap when shrunk
  });

  const labelOpacity = animValue.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 1],
  });

  const labelHeight = animValue.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 12],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { width: navWidth, height: navHeight }
      ]}
    >
      <Animated.View style={[styles.tabContent, { gap: itemGap }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

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
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.navItem]}
              activeOpacity={0.7}
            >
              <Animated.View style={{
                transform: [{ scale: iconScale }],
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getIcon(route.name, isFocused)}
              </Animated.View>

              <Animated.Text
                numberOfLines={1}
                style={[
                  styles.navLabel,
                  {
                    color: isFocused ? colors.primary.base : colors.text.secondary,
                    opacity: labelOpacity,
                    height: labelHeight,
                    marginTop: labelHeight.interpolate({ inputRange: [0, 12], outputRange: [0, 4] })
                  }
                ]}
              >
                {route.name}
              </Animated.Text>

              {isFocused && (
                <Animated.View style={[
                  styles.activeDot,
                  {
                    bottom: labelHeight.interpolate({ inputRange: [0, 12], outputRange: [-2, -8] }),
                    opacity: labelOpacity
                  }
                ]} />
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

const getStyles = (colors: Colors, background: string) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: background,
    borderRadius: 30, // Matches 70px height for pill look
    borderWidth: 0.1,
    borderColor: colors.border.glassLight,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  navLabel: {
    fontFamily: typography.families.ui,
    fontSize: 8.5, // Matches High-Fidelity Mockup
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
