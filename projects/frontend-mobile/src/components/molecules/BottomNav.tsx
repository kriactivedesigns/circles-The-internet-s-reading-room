import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
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
  scrollY: Animated.Value;
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

  const lastScrollY = useRef(0);
  const animValue = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Dissolve effect when navigating away from MainTabs
  useEffect(() => {
    const isMainTab = TABS.some(t => t.name === routeName);
    
    if (!isMainTab) {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }
  }, [routeName]);

  useEffect(() => {
    if (routeName !== 'Feed') {
      Animated.spring(animValue, {
        toValue: 1,
        friction: 8,
        tension: 60,
        useNativeDriver: false,
      }).start();
    }
  }, [routeName]);

  useEffect(() => {
    if (!scrollY) return;

    const listenerId = scrollY.addListener(({ value }) => {
      if (routeName !== 'Feed') return;

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
  }, [scrollY, routeName]);

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
    outputRange: [16, 60],
  });

  const navPadding = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 20],
  });

  const labelOpacity = animValue.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 1],
  });

  const labelHeight = animValue.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 12],
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
    <Animated.View
      style={[
        styles.outerContainer,
        {
          opacity: fadeAnim,
        }
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: navWidth,
            height: navHeight,
          }
        ]}
      >
        <GlowEffect style={{ left: '10%', right: '10%' }} />
        <Animated.View style={[styles.tabContent, { gap: itemGap, paddingHorizontal: navPadding }]}>
          {TABS.map((tab) => {
            const isFocused = routeName === tab.name;

            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => onTabPress(tab.name)}
                style={[styles.navItem]}
                activeOpacity={0.7}
              >
                <Animated.View style={{
                  transform: [{ scale: iconScale }],
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getIcon(tab.name, isFocused)}
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
                  {tab.name}
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
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.text.secondary,
  },
  activeDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: colors.primary.base,
    position: 'absolute',
  },
});
