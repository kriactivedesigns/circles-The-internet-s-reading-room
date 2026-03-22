import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Button } from '../../components/atoms/Button';
import { ProfilePhotoUpload } from '../../components/atoms/ProfilePhotoUpload';
import { LabeledInput } from '../../components/molecules/LabeledInput';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

export const BaseProfileScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Private Indicator */}
          <View style={styles.header}>
            <View style={styles.privateIndicator}>
              <Svg width="12" height="12" fill="none" stroke={colors.text.muted} strokeWidth="2" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </Svg>
              <Text style={styles.privateText}>Strictly Private</Text>
            </View>
            <Text style={styles.title}>Set up your Base Profile</Text>
            <Text style={styles.subtitle}>
              This is your master identity. It remains securely hidden and is never shown to other users.
            </Text>
          </View>

          {/* Photo Upload */}
          <View style={styles.photoContainer}>
            <ProfilePhotoUpload />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <LabeledInput label="Full Name" placeholder="e.g. Alexandre Smith" />
            <LabeledInput label="Date of Birth" placeholder="YYYY-MM-DD" />
            <LabeledInput label="Location" placeholder="e.g. Bengaluru, India" />
          </View>

          <View style={styles.footer}>
            <Button 
              label="Continue to Persona →" 
              variant="brand" 
              style={styles.continueButton}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  privateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  privateText: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.text.muted,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '300',
    color: colors.text.secondary,
    lineHeight: 17.6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
    marginBottom: 32,
  },
  footer: {
    marginTop: 'auto',
  },
  continueButton: {
    width: '100%',
  },
});
