import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { radii } from '../../theme/radii';
import { GlowEffect } from '../../components/atoms/GlowEffect';

const { width } = Dimensions.get('window');

const Tag: React.FC<{ type: 'active' | 'quiet' | 'root' }> = ({ type }) => {
  const { colors } = useTheme();
  const styles = getTagStyles(colors, type);
  const label = type === 'active' ? 'Active' : type === 'quiet' ? 'Quiet' : 'Planted Root';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const LobbyCard: React.FC<{
  title: string;
  avatars: string[];
  extras?: number;
  type: 'active' | 'quiet';
  onPress: () => void;
  footerLabel?: string;
}> = ({ title, avatars, extras, type, onPress, footerLabel }) => {
  const { colors, isDark } = useTheme();
  const isQuiet = type === 'quiet';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.lobbyCard,
        {
          backgroundColor: colors.background.glass,
          borderColor: colors.border.glass,
          opacity: isQuiet ? 0.65 : 1
        }
      ]}
    >
      <GlowEffect />
      <View style={styles.cardHeader}>
        <View style={styles.avatarStack}>
          {avatars.map((initial, i) => (
            <View
              key={i}
              style={[
                styles.stackAvatar,
                {
                  backgroundColor: i % 2 === 0 ? colors.primary.opacity20 : colors.background.surface,
                  borderColor: colors.background.base,
                  zIndex: 10 - i,
                  marginLeft: i === 0 ? 0 : -8
                }
              ]}
            >
              <Text style={[styles.avatarText, { color: i % 2 === 0 ? colors.primary.base : colors.text.secondary }]}>{initial}</Text>
            </View>
          ))}
          {extras && (
            <View style={[styles.stackAvatar, { backgroundColor: colors.primary.opacity10, borderColor: colors.background.base, marginLeft: -8 }]}>
              <Text style={[styles.avatarText, { color: colors.primary.base, fontSize: 9 }]}>+{extras}</Text>
            </View>
          )}
        </View>
        <Tag type={type} />
      </View>

      <Text style={[styles.lobbyTitle, { color: colors.text.primary }]}>{title}</Text>

      {footerLabel && (
        <View style={[styles.cardFooterChip, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
          <Text style={[styles.footerText, { color: colors.text.secondary }]}>{footerLabel}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const RootCard: React.FC<{ title: string; lastActive: string; onPress: () => void }> = ({ title, lastActive, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.lobbyCard, { backgroundColor: colors.background.glass, borderColor: colors.border.glass, opacity: 0.6 }]}
    >
      <GlowEffect />
      <View style={styles.cardHeader}>
        <View style={[styles.rootIcon, { backgroundColor: colors.status.success + '12', borderColor: colors.status.success + '25' }]}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.status.success} strokeWidth="2">
            <Path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            <Path d="M14.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </Svg>
        </View>
        <Tag type="root" />
      </View>
      <Text style={[styles.lobbyTitle, { color: colors.text.primary, marginBottom: 4 }]}>{title}</Text>
      <Text style={[styles.lastActiveText, { color: colors.text.muted }]}>{lastActive}</Text>
    </TouchableOpacity>
  );
};

export const OrbitScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.onboardingHeader}>
          <Text style={[styles.screenTitle, { color: colors.text.primary }]}>Your Orbit</Text>
          <Text style={[styles.onlineCount, { color: colors.text.muted }]}>
            <Text style={{ color: colors.primary.base, fontWeight: '700' }}>124</Text> matching personas online
          </Text>
        </View>

        <View style={styles.lobbyGrid}>
          <LobbyCard
            type="active"
            title="SaaS Scaling & UI Architecture"
            avatars={['A', 'B', 'C']}
            extras={2}
            footerLabel="5 Personas · 1 Note dropped"
            onPress={() => navigation.navigate('Sandbox')}
          />

          <LobbyCard
            type="quiet"
            title="Indie Publishing & Long-form Writing"
            avatars={['D', 'E']}
            onPress={() => { }}
          />

          <RootCard
            title="Indie Hackers Kerala"
            lastActive="Last active 2 days ago"
            onPress={() => navigation.navigate('Sandbox')}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const getTagStyles = (colors: any, type: string) => StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 0.5,
    backgroundColor: type === 'active' ? 'rgba(92,148,233,0.12)' : type === 'quiet' ? 'rgba(255,255,255,0.06)' : 'rgba(16,185,129,0.10)',
    borderColor: type === 'active' ? 'rgba(92,148,233,0.30)' : type === 'quiet' ? 'rgba(255,255,255,0.12)' : 'rgba(16,185,129,0.25)',
  },
  text: {
    fontFamily: typography.families.ui,
    fontSize: 8,
    fontWeight: '700',
    color: type === 'active' ? colors.primary.base : type === 'quiet' ? 'rgba(255,255,255,0.55)' : colors.status.success,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  }
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 24 },
  onboardingHeader: { marginBottom: 20 },
  screenTitle: { fontFamily: typography.families.ui, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  onlineCount: { fontFamily: typography.families.ui, fontSize: 11, fontWeight: '300', color: 'rgba(255,255,255,0.45)' },

  lobbyGrid: { gap: 14 },
  lobbyCard: {
    padding: 18,
    borderRadius: radii.card,
    borderWidth: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: typography.families.ui, fontSize: 11, fontWeight: '700' },

  lobbyTitle: { fontFamily: typography.families.ui, fontSize: 15, fontWeight: '600', lineHeight: 20 },
  cardFooterChip: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  footerText: { fontFamily: typography.families.ui, fontSize: 8.5, color: 'rgba(255,255,255,0.55)' },

  rootIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastActiveText: { fontFamily: typography.families.ui, fontSize: 9, color: 'rgba(255,255,255,0.35)' },
});
