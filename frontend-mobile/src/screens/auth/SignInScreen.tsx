import React from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { Logo } from '../../components/atoms/Logo';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Divider } from '../../components/atoms/Divider';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

export const SignInScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation<any>();

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          {/* Main Card Container */}
          <View style={styles.glassContainer}>

            {/* Header/Logo section */}
            <View style={styles.headerArea}>
              <View style={styles.logoWrapper}>
                <Logo variant="signIn" />
              </View>
              <Text style={styles.title}>circles</Text>
              <Text style={styles.subtitle}>the internet's reading room.</Text>
            </View>

            {/* Core messaging */}
            <View style={styles.messagingArea}>
              <Text style={styles.greeting}>Welcome back.</Text>
              <Text style={styles.tagline}>
                No vanity metrics. No noise.{"\n"}Just deep conversations.
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionGroup}>
              <Input
                placeholder="Mobile Number"
                keyboardType="phone-pad"
              />
              <Button
                variant="white"
                label="Continue"
                style={styles.continueBtn}
                onPress={() => navigation.navigate('OTP')}
              />
            </View>

            <Divider label="or connect with" />

            {/* OAuth */}
            <View style={styles.oauthGroup}>
              <Button
                variant="glass"
                label="Continue with Google"
                style={styles.oauthBtn}
                onPress={() => navigation.navigate('OTP')}
                leftIcon={
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </Svg>
                }
              />
              <Button
                variant="glass"
                label="Continue with Apple"
                style={styles.oauthBtn}
                onPress={() => navigation.navigate('OTP')}
                leftIcon={
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.53.1 2.75.65 3.58 1.7-3.13 1.93-2.67 5.76.5 7.03-.78 1.83-1.63 3.37-2.66 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill={colors.text.primary} />
                  </Svg>
                }
              />
            </View>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.transparent,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  glassContainer: {
    width: '100%',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 28,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.glass,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoWrapper: {
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 4,
    color: colors.text.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '300',
    letterSpacing: 2,
    color: colors.primary.base,
    marginBottom: 18,
  },
  messagingArea: {
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontFamily: typography.families.ui,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 6,
  },
  tagline: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '300',
    color: colors.text.secondary,
    lineHeight: 17.6, // 1.6 * 11px
    textAlign: 'center',
  },
  actionGroup: {
    gap: 10,
  },
  continueBtn: {
    width: '100%',
  },
  oauthGroup: {
    gap: 10,
  },
  oauthBtn: {
    width: '100%',
    paddingVertical: 12,
  }
});
