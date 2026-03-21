import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../components/atoms/Logo';
import { Button } from '../../components/atoms/Button';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

export const SplashScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          
          {/* Logo */}
          <View style={styles.logoWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleTheme}>
              <Logo variant="xl" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>circles</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>the internet's reading room.</Text>

          {/* Actions */}
          <Button 
            variant="white" 
            label="Get Started" 
            style={styles.primaryButton} 
          />
          <Button 
            variant="outline" 
            label="I already have an account" 
            style={styles.secondaryButton} 
          />

          {/* Legal Text */}
          <Text style={styles.legalText}>
            By continuing, you agree to our Terms of Service{"\n"}
            and Privacy Policy. No data is ever sold.
          </Text>

        </View>

        {/* Footer Pill */}
        <View style={styles.footerContainer}>
          <View style={styles.footerPill}>
            <View style={styles.footerDot} />
            <Text style={styles.footerText}>CausalSyntax · causalsyntax.com</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

// Values dynamically parsed based on current context constraints
const getStyles = (colors: Colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    zIndex: 10,
    backgroundColor: colors.background.base,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  logoWrapper: {
    marginBottom: 28,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 5,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '300',
    letterSpacing: 2.5,
    color: colors.primary.base,
    marginBottom: 48,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 16,
  },
  secondaryButton: {
    width: '100%',
  },
  legalText: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '300',
    color: colors.text.muted,
    marginTop: 28,
    lineHeight: 15.3, 
    textAlign: 'center',
  },
  footerContainer: {
    paddingBottom: 36,
    alignItems: 'center',
  },
  footerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background.glass,
    borderColor: colors.border.glass,
    borderWidth: 0.5,
    borderRadius: 9999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  footerDot: {
    width: 5,
    height: 5,
    borderRadius: 9999,
    backgroundColor: colors.primary.base,
  },
  footerText: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    fontWeight: '500',
    color: colors.text.secondary,
  },
});
