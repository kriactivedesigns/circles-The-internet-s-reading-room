import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { GlowEffect } from '../atoms/GlowEffect';

const { width } = Dimensions.get('window');

interface ShelfCardProps {
  type: 'book' | 'article' | 'stage';
  title: string;
  subtitle: string;
}

export const ShelfCard: React.FC<ShelfCardProps> = ({ type, title, subtitle }) => {
  const { colors, isDark } = useTheme();

  // Wide layout for Stage
  if (type === 'stage') {
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.cardWide, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
        <GlowEffect />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={[styles.playIconContainer, { backgroundColor: 'rgba(92,148,233,0.1)', borderColor: 'rgba(92,148,233,0.3)' }]}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary.base}>
              <Path d="M8 5v14l11-7z" />
            </Svg>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={[styles.badgeBase, { backgroundColor: 'rgba(92,148,233,0.15)', borderColor: 'rgba(92,148,233,0.3)', marginBottom: 8, alignSelf: 'flex-start' }]}>
              <Text style={[styles.badgeText, { color: colors.primary.base }]}>RECORDED STAGE</Text>
            </View>
            <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.text.muted }]}>{subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid layout for Book & Article
  const isArticle = type === 'article';
  const coverBg = isArticle ? 'rgba(16,185,129,0.06)' : 'rgba(92,148,233,0.06)';
  const iconColor = isArticle ? '#10B981' : '#5C94E9';

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.cardGrid, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
      <GlowEffect />
      <View style={[styles.coverArea, { backgroundColor: coverBg }]}>
        {isArticle && (
          <View style={[styles.badgeBase, { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', position: 'absolute', top: 12, left: 12 }]}>
            <Text style={[styles.badgeText, { color: 'rgba(255,255,255,0.6)' }]}>ARTICLE</Text>
          </View>
        )}

        {isArticle ? (
          <Svg width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </Svg>
        ) : (
          <Svg width="26" height="26" fill="none" stroke={iconColor} strokeWidth="1.5" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </Svg>
        )}
      </View>
      <View style={styles.gridMeta}>
        <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={2}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.text.muted }]} numberOfLines={1}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardGrid: {
    width: (width - 56) / 2, // 20 padding each side, 16 gap
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    height: 240,
  },
  coverArea: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  gridMeta: {
    gap: 4,
    minHeight: 40,
  },
  cardWide: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  playIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeBase: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: typography.families.ui,
    fontSize: 7.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '500',
  },
});
