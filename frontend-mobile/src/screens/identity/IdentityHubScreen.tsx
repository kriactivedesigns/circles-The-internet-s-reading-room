import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Header } from '../../components/molecules/Header';
import { Button } from '../../components/atoms/Button';

export const IdentityHubScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BASE PROFILE CARD */}
        <View style={styles.baseCard}>
          <View style={styles.privateBadge}>
            <Svg width="9" height="9" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </Svg>
            <Text style={styles.privateText}>PRIVATE</Text>
          </View>

          <View style={styles.baseRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.avatarBadge}>
                <Svg width="8" height="8" fill="white" viewBox="0 0 24 24">
                  <Path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </View>
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.baseLabel}>Base Profile</Text>
              <Text style={styles.name} numberOfLines={1}>Alexandre Smith</Text>
              <Text style={styles.email}>alex@causalsyntax.com</Text>
              <Text style={styles.meta}>Bengaluru, India · he/him</Text>
            </View>
          </View>

          <Text style={styles.bio}>
            "Builder, reader, occasional jazz snob. Thinking about third places in digital spaces."
          </Text>

          <Button
            variant="glass"
            label="Edit Base Details"
            style={styles.editBtn}
            textStyle={styles.editBtnText}
            onPress={() => navigation.navigate('EditBaseProfile')}
            leftIcon={
              <Svg width="16" height="16" fill="none" stroke={colors.text.muted} strokeWidth="2" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </Svg>
            }
          />
        </View>

        {/* YOUR PERSONAS HEADER */}
        <View style={styles.personasHeader}>
          <Text style={styles.sectionTitle}>YOUR PERSONAS</Text>
          <Text style={styles.sectionSubtitle}>2 of 5 active</Text>
        </View>

        {/* ACTIVE PERSONA LIST */}
        <View style={styles.activePersona}>
          <View style={[styles.personaAvatar, styles.activeAvatar]}>
            <Text style={styles.activeAvatarText}>A</Text>
          </View>
          <View style={styles.personaInfo}>
            <View style={styles.personaTitleRow}>
              <Text style={styles.personaName}>Alex_UX</Text>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.personaDesc} numberOfLines={1}>Design · SaaS · Architecture</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditPersona')} style={styles.editIconBtn}>
            <Svg width="16" height="16" fill="none" stroke={colors.text.muted} strokeWidth="2" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* INACTIVE PERSONA LIST */}
        <View style={styles.inactivePersona}>
          <View style={[styles.personaAvatar, styles.inactiveAvatar]}>
            <Text style={styles.inactiveAvatarText}>C</Text>
          </View>
          <View style={styles.personaInfo}>
            <Text style={styles.inactivePersonaName}>CoffeeSnob</Text>
            <Text style={styles.personaDesc} numberOfLines={1}>Culture · Brewing · Travel</Text>
          </View>
          <View style={styles.inactiveActions}>
            <TouchableOpacity onPress={() => navigation.navigate('EditPersona')} style={styles.editIconBtn}>
              <Svg width="16" height="16" fill="none" stroke={colors.text.muted} strokeWidth="2" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </Svg>
            </TouchableOpacity>
            <Button variant="brand" label="Switch" style={styles.switchBtn} />
          </View>
        </View>

        {/* CREATE NEW PERSONA */}
        <TouchableOpacity
          style={styles.createNewBtn}
          onPress={() => navigation.navigate('EditPersona')}
          activeOpacity={0.7}
        >
          <Svg width="15" height="15" fill="none" stroke={colors.text.primary} strokeWidth="2" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </Svg>
          <Text style={styles.createNewText}>Create New Persona</Text>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Splash')}
          activeOpacity={0.7}
        >
          <Svg width="15" height="15" fill="none" stroke={colors.status.error} strokeWidth="2" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </Svg>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.transparent,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  baseCard: {
    backgroundColor: colors.background.glass,
    borderColor: colors.border.glass,
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    position: 'relative',
  },
  privateBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  privateText: {
    fontFamily: typography.families.ui,
    fontSize: 7.5,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 0.5,
  },
  baseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1a3060',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(92,148,233,0.40)',
  },
  avatarText: {
    fontFamily: typography.families.ui,
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.base,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary.base,
    borderWidth: 2,
    borderColor: '#05070A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  baseLabel: {
    fontFamily: typography.families.ui,
    fontSize: 8,
    fontWeight: '700',
    color: colors.primary.base,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  name: {
    fontFamily: typography.families.ui,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  email: {
    fontFamily: typography.families.ui,
    fontSize: 9.5,
    color: colors.text.muted,
    marginBottom: 1,
  },
  meta: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    color: 'rgba(255,255,255,0.28)',
  },
  bio: {
    fontFamily: typography.families.ui,
    fontSize: 10,
    fontWeight: '300',
    color: colors.text.muted,
    lineHeight: 16,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  editBtn: {
    paddingVertical: 12, // override default 14
    width: '100%',
  },
  editBtnText: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.primary,
  },
  personasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
  },
  sectionSubtitle: {
    fontFamily: typography.families.ui,
    fontSize: 8,
    color: 'rgba(255,255,255,0.25)',
  },
  personaAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  activePersona: {
    backgroundColor: 'rgba(92,148,233,0.08)',
    borderColor: 'rgba(92,148,233,0.28)',
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeAvatar: {
    backgroundColor: '#1a3060',
    borderColor: colors.primary.base,
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  activeAvatarText: {
    fontFamily: typography.families.ui,
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary.base,
  },
  personaInfo: {
    flex: 1,
  },
  personaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  personaName: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  activeTag: {
    backgroundColor: colors.primary.base,
    borderRadius: 9999,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  activeTagText: {
    fontFamily: typography.families.ui,
    fontSize: 7,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  personaDesc: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    color: colors.text.muted,
  },
  editIconBtn: {
    padding: 4,
  },
  inactivePersona: {
    backgroundColor: colors.background.glass,
    borderColor: colors.border.glass,
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inactiveAvatar: {
    backgroundColor: '#2a1a0d',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  inactiveAvatarText: {
    fontFamily: typography.families.ui,
    fontSize: 15,
    fontWeight: '700',
    color: '#c4965a',
  },
  inactivePersonaName: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 2,
  },
  inactiveActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  switchBtnText: {
    fontSize: 9,
  },
  createNewBtn: {
    width: '100%',
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  createNewText: {
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    fontWeight: '500',
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 24,
  },
  logoutBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
  },
  logoutText: {
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.status.error,
  },
});
