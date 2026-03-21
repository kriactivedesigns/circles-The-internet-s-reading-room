import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../../components/atoms/Logo';
import { radii } from '../../theme/radii';

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
          borderColor: colors.border.glassDark,
          opacity: isQuiet ? 0.65 : 1
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarStack}>
          {avatars.map((initial, i) => (
            <View 
              key={i} 
              style={[
                styles.stackAvatar, 
                { 
                  backgroundColor: i % 2 === 0 ? '#1a1a3a' : '#1a3a2a',
                  borderColor: colors.background.base,
                  zIndex: 10 - i,
                  marginLeft: i === 0 ? 0 : -8
                }
              ]}
            >
              <Text style={[styles.avatarText, { color: i % 2 === 0 ? '#8899ee' : '#55cc88' }]}>{initial}</Text>
            </View>
          ))}
          {extras && (
            <View style={[styles.stackAvatar, { backgroundColor: 'rgba(92,148,233,0.15)', borderColor: colors.background.base, marginLeft: -8 }]}>
              <Text style={[styles.avatarText, { color: colors.primary.base, fontSize: 9 }]}>+{extras}</Text>
            </View>
          )}
        </View>
        <Tag type={type} />
      </View>
      
      <Text style={[styles.lobbyTitle, { color: '#fff' }]}>{title}</Text>
      
      {footerLabel && (
        <View style={[styles.cardFooterChip, { backgroundColor: isDark ? 'rgba(12,14,20,0.90)' : 'rgba(255,255,255,0.8)' }]}>
          <Text style={styles.footerText}>{footerLabel}</Text>
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
      style={[styles.lobbyCard, { backgroundColor: colors.background.glass, borderColor: colors.border.glassDark, opacity: 0.6 }]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.rootIcon, { backgroundColor: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.25)' }]}>
           <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
             <Path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
             <Path d="M14.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
           </Svg>
        </View>
        <Tag type="root" />
      </View>
      <Text style={[styles.lobbyTitle, { color: '#fff', marginBottom: 4 }]}>{title}</Text>
      <Text style={styles.lastActiveText}>{lastActive}</Text>
    </TouchableOpacity>
  );
};

export const OrbitScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: isDark ? 'rgba(5,7,10,0.8)' : 'rgba(242,244,247,0.8)' }]}>
        <View style={styles.wordmarkRow}>
          <Logo variant="nav" />
          <Text style={[styles.wordmark, { color: '#fff' }]}>circles</Text>
        </View>
        
        <TouchableOpacity style={[styles.personaChip, { borderColor: colors.border.glassLight }]}>
          <View style={styles.pcDot} />
          <View style={[styles.pcAvatar, { backgroundColor: '#1a3060' }]}>
            <Text style={[styles.pcAvatarText, { color: colors.primary.base }]}>A</Text>
          </View>
          <Text style={[styles.pcAlias, { color: '#fff' }]}>Alex_UX</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.onboardingHeader}>
           <Text style={[styles.screenTitle, { color: '#fff' }]}>Your Orbit</Text>
           <Text style={styles.onlineCount}>
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
            onPress={() => {}}
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
  header: {
    paddingTop: 44,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 40,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  wordmarkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  personaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 0.5,
    backgroundColor: 'rgba(12,14,20,0.9)',
  },
  pcDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#5C94E9', marginRight: 6 },
  pcAvatar: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  pcAvatarText: { fontSize: 8.5, fontWeight: '700' },
  pcAlias: { marginLeft: 6, fontSize: 8.5, fontWeight: '500' },

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
