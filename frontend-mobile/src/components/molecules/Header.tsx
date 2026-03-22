import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { Colors } from '../../theme/colors';
import { Logo } from '../atoms/Logo';
import { GlowEffect } from '../atoms/GlowEffect';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  routeName?: string;
  canGoBack?: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  
  const isTabRoute = props.routeName === 'Feed' || props.routeName === 'Orbit' || props.routeName === 'Shelf';
  const showWordmark = !props.showBack && isTabRoute;
  const canGoBack = (props.showBack || props.canGoBack) && !isTabRoute;
  
  const displayTitle = props.title || (props.routeName === 'Sandbox' ? 'Sandbox' : undefined);
  const handleBack = props.onBack;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {!showWordmark ? (
          <View style={styles.backRow}>
            <TouchableOpacity
              onPress={handleBack}
              style={[styles.backBtn, { borderColor: colors.border.glass, backgroundColor: colors.background.glass }]}
            >
              <GlowEffect />
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2.5">
                <Path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
            {displayTitle && <Text style={styles.backTitle}>{displayTitle}</Text>}
          </View>
        ) : (
          <View style={styles.wordmarkRow}>
            <Logo variant="nav" />
            <Text style={styles.wordmark}>circles</Text>
          </View>
        )}
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={[styles.personaChip, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
          <GlowEffect style={{ left: '20%', right: '20%' }} />
          <View style={[styles.personaAvatar, { backgroundColor: colors.primary.opacity20 }]}>
            <Text style={[styles.personaInitial, { color: colors.primary.base }]}>A</Text>
          </View>
          <Text style={styles.personaAlias}>Alex_UX</Text>
          <View style={[styles.pulseDot, { backgroundColor: colors.status.error }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    height: 90,
    paddingTop: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 100,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTitle: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.text.primary,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  wordmark: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: colors.text.primary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingRight: 10,
    borderRadius: 999,
    borderWidth: 0.5,
    gap: 8,
  },
  personaAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personaInitial: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '700',
  },
  personaAlias: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '600',
    color: colors.text.primary,
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
