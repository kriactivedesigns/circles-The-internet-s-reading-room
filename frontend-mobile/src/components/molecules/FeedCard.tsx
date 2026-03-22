import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Tag } from '../atoms/Tag';
import { Button } from '../atoms/Button';
import { GlowEffect } from '../atoms/GlowEffect';

interface FeedCardProps {
  type: 'article' | 'book' | 'stage' | 'sponsored';
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  author?: string;
  time?: string;
  initial?: string;
}

export const FeedCard: React.FC<FeedCardProps> = ({ type, title, subtitle, description, tag, author, time, initial }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);

  if (type === 'article') {
    return (
      <View style={styles.card}>
        <GlowEffect />
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.background.base }]}>
          <View style={[styles.avatarFixed, { backgroundColor: colors.primary.opacity20 }]}>
            <Text style={[styles.avatarText, { color: colors.primary.base }]}>?</Text>
          </View>
          <View style={styles.overlay}>
            <Tag label={tag || "Deep Read"} variant="tech" />
          </View>
          <View style={styles.bottomOverlay}>
            <View style={styles.authorRow}>
              <View style={[styles.miniAvatar, { backgroundColor: colors.primary.opacity20, borderColor: colors.primary.base + '40' }]}>
                <Text style={[styles.miniAvatarText, { color: colors.primary.base }]}>{initial || 'K'}</Text>
              </View>
              <Text style={styles.authorName}>{author || 'Kevin Rose · UX Weekly'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.metaBadge}>{subtitle || 'UX Philosophy'}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.metaInfo}>{time || '8 min read'}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={3}>{description}</Text>
        </View>
      </View>
    );
  }

  if (type === 'book') {
    return (
      <View style={[styles.card, styles.bookCard]}>
        <GlowEffect />
        <View style={[styles.bookCover, { backgroundColor: colors.primary.opacity10 }]}>
          <View style={[styles.avatarFixed, { backgroundColor: colors.primary.opacity20 }]}>
            <Text style={[styles.avatarText, { color: colors.primary.base }]}>?</Text>
          </View>
        </View>
        <View style={styles.bookContent}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Tag label="Book Shelf" variant="tech" />
          </View>
          <Text style={styles.bookTitle}>{title}</Text>
          <Text style={styles.bookAuthor}>{author}</Text>
          <View style={styles.bookActions}>
            <TouchableOpacity style={styles.glassBtn}>
              <Text style={styles.glassBtnText}>+ Shelf</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.brandBtn}>
              <Text style={styles.brandBtnText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (type === 'sponsored') {
    return (
      <View style={[styles.card, { padding: 18 }]}>
        <GlowEffect />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Tag label="Sponsored" variant="warning" />
          <TouchableOpacity>
            <Svg width="14" height="14" fill="none" stroke={colors.text.muted} viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          <View style={[styles.avatarFixed, { backgroundColor: colors.background.surface, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 10, width: 44, height: 44 }]}>
            <Text style={[styles.avatarText, { color: colors.primary.base, fontSize: 13 }]}>{initial || 'U'}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.title, { marginBottom: 2 }]}>{title}</Text>
            <Text style={{ fontSize: 10, color: colors.text.muted }}>{subtitle}</Text>
          </View>
        </View>
        <Text style={[styles.description, { marginBottom: 16 }]}>{description}</Text>
        <Button label="Schedule a 1-on-1 Circle" variant="brand" style={{ width: '100%' }} />
      </View>
    );
  }

  // Stage Card
  return (
    <View style={[styles.card, { padding: 18 }]}>
      <GlowEffect />
      <View style={[styles.stageHeader, { justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <View style={[styles.livePulse, { backgroundColor: colors.primary.base }]} />
          <Text style={[styles.stageBadge, { color: colors.primary.base }]}>UPCOMING STAGE</Text>
        </View>
        <Tag label="Free" variant="warning" />
      </View>
      <Text style={[styles.title, { marginBottom: 5 }]}>{title}</Text>
      <Text style={[styles.description, { marginBottom: 16 }]}>{description}</Text>
      <View style={styles.hostPill}>
        <View style={styles.hostProfile}>
          <View style={[styles.miniAvatar, { backgroundColor: colors.primary.opacity10, borderColor: colors.primary.base + '40', width: 28, height: 28, borderRadius: 14 }]}>
            <Text style={[styles.miniAvatarText, { color: colors.primary.base, fontSize: 10 }]}>{initial || 'V'}</Text>
          </View>
          <Text style={[styles.hostName, { color: colors.text.primary }]}>{author || 'Vercel Team'}</Text>
        </View>
        <Text style={[styles.stageTime, { color: colors.primary.base }]}>{time || 'Tonight, 8 PM'}</Text>
      </View>
      <Button
        label="Reserve Your Seat"
        variant="brand"
        style={{ width: '100%' }}
      />
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.glass,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.glass,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFixed: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  miniAvatarText: {
    fontFamily: typography.families.ui,
    fontSize: 7,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaBadge: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary.base,
    textTransform: 'uppercase',
  },
  dot: {
    fontSize: 9,
    color: colors.text.muted,
  },
  metaInfo: {
    fontSize: 9.5,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 21.6,
  },
  description: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '400',
    color: colors.text.secondary,
    lineHeight: 18.15,
  },
  bookCard: {
    flexDirection: 'row',
  },
  bookCover: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 6,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  bookAuthor: {
    fontSize: 10,
    color: colors.text.muted,
  },
  bookActions: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 4,
  },
  glassBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  glassBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text.primary,
  },
  brandBtn: {
    backgroundColor: colors.primary.base,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  brandBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 11,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stageBadge: {
    fontSize: 8.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  hostPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: colors.background.base,
    padding: 10,
    borderRadius: 12
  },
  hostProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hostName: {
    fontSize: 10.5,
    fontWeight: '500',
  },
  stageTime: {
    fontSize: 10,
    fontWeight: '600',
  },
  brandBtnLarge: {
    padding: 11,
    borderRadius: 12,
    alignItems: 'center',
  },
});
