import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Tag } from '../atoms/Tag';
import { Button } from '../atoms/Button';

interface FeedCardProps {
  type: 'article' | 'book' | 'stage';
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  author?: string;
  time?: string;
  initial?: string;
}

export const FeedCard: React.FC<FeedCardProps> = ({ type, title, subtitle, description, tag, author, time, initial }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  if (type === 'article') {
    return (
      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          <View style={[styles.avatarFixed, { backgroundColor: '#1a2a3a' }]}>
            <Text style={[styles.avatarText, { color: '#8899ee' }]}>?</Text>
          </View>
          <View style={styles.overlay}>
             <Tag label={tag || "Deep Read"} selected />
          </View>
          <View style={styles.bottomOverlay}>
             <View style={styles.authorRow}>
                <View style={[styles.miniAvatar, { backgroundColor: '#1a3a5c' }]}>
                   <Text style={[styles.miniAvatarText, { color: '#7db3f0' }]}>{initial || 'K'}</Text>
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
        <View style={styles.bookCover}>
          <View style={[styles.avatarFixed, { backgroundColor: '#1a2a3a' }]}>
             <Text style={[styles.avatarText, { color: '#8899ee' }]}>?</Text>
          </View>
        </View>
        <View style={styles.bookContent}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Tag label="Book Shelf" selected />
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

  // Stage Card
  return (
    <View style={[styles.card, { borderColor: 'rgba(92,148,233,0.18)', padding: 18 }]}>
      <View style={styles.stageHeader}>
        <View style={styles.livePulse} />
        <Text style={styles.stageBadge}>Upcoming Stage</Text>
        <View style={styles.freeBadge}>
           <Text style={styles.freeText}>Free</Text>
        </View>
      </View>
      <Text style={[styles.title, { marginBottom: 5 }]}>{title}</Text>
      <Text style={[styles.description, { marginBottom: 12 }]}>{description}</Text>
      <View style={styles.hostPill}>
        <View style={styles.hostProfile}>
          <View style={[styles.miniAvatar, { backgroundColor: '#0d1e38', borderColor: 'rgba(92,148,233,0.40)' }]}>
             <Text style={[styles.miniAvatarText, { color: '#5C94E9' }]}>{initial || 'V'}</Text>
          </View>
          <Text style={styles.hostName}>{author || 'Vercel Team'}</Text>
        </View>
        <Text style={styles.stageTime}>{time || 'Tonight, 8 PM'}</Text>
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
    backgroundColor: '#05070A',
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
    borderColor: 'rgba(92, 148, 233, 0.5)',
  },
  miniAvatarText: {
    fontFamily: typography.families.ui,
    fontSize: 7,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
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
    color: 'rgba(255, 255, 255, 0.25)',
  },
  metaInfo: {
    fontSize: 9.5,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.50)',
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
    backgroundColor: '#0d1e38',
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
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.glass,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  glassBtnText: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  brandBtn: {
    backgroundColor: colors.primary.base,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  brandBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
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
    backgroundColor: colors.primary.base,
  },
  stageBadge: {
    fontSize: 8.5,
    fontWeight: '700',
    color: colors.primary.base,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  freeBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  freeText: {
    fontSize: 7.5,
    color: colors.text.secondary,
  },
  hostPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    padding: 9,
    marginBottom: 13,
  },
  hostProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hostName: {
    fontSize: 10.5,
    fontWeight: '500',
    color: colors.text.primary,
  },
  stageTime: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary.base,
  },
  brandBtnLarge: {
    backgroundColor: colors.primary.base,
    padding: 11,
    borderRadius: 12,
    alignItems: 'center',
  },
});
