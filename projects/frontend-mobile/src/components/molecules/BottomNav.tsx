import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');

interface BottomNavProps {
  scrollValue: Animated.Value;
}

export const BottomNav: React.FC<BottomNavProps> = ({ scrollValue }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Animation values
  const lastScrollY = useRef(0);
  const animValue = useRef(new Animated.Value(1)).current; // 1 = full, 0 = shrunk

  // Use a listener to track scroll direction
  useEffect(() => {
    const listenerId = scrollValue.addListener(({ value }) => {
      const diff = value - lastScrollY.current;
      
      if (value < 50) {
        // Near the top, always show full
        Animated.timing(animValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (diff > 5) {
        // Scrolling deep (up action), shrink
        Animated.timing(animValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (diff < -5) {
        // Scrolling back to top (down action), restore
        Animated.timing(animValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      
      lastScrollY.current = value;
    });

    return () => scrollValue.removeListener(listenerId);
  }, []);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ scale }], opacity }
      ]}
    >
      <TouchableOpacity style={styles.navItem}>
        <Svg width="20" height="20" stroke={colors.primary.base} strokeWidth="2" fill="none" viewBox="0 0 24 24">
          <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </Svg>
        <Text style={[styles.navLabel, { color: colors.primary.base }]}>Feed</Text>
        <View style={styles.activeDot} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Svg width="20" height="20" stroke={colors.text.secondary} strokeWidth="2" fill="none" viewBox="0 0 24 24">
          <Path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </Svg>
        <Text style={styles.navLabel}>Orbit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Svg width="20" height="20" stroke={colors.text.secondary} strokeWidth="2" fill="none" viewBox="0 0 24 24">
          <Path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </Svg>
        <Text style={styles.navLabel}>Shelf</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: width * 0.85,
    height: 64,
    backgroundColor: colors.background.glass,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.glass,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary.base,
    position: 'absolute',
    bottom: -8,
  },
});
