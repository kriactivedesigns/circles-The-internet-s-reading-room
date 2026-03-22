import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { Button } from '../../components/atoms/Button';
import { OTPInput } from '../../components/atoms/OTPInput';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

export const OTPScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<any>();

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <View style={styles.glassCard}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Svg width="18" height="18" fill="none" stroke={colors.text.secondary} strokeWidth="2" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </Svg>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.emoji}>📲</Text>
              <Text style={styles.title}>Verify your number</Text>
              <Text style={styles.subtitle}>
                We sent a 4-digit code to{"\n"}
                <Text style={styles.phoneNumber}>+91 98765 43210</Text>
              </Text>
            </View>

            {/* OTP Input */}
            <View style={styles.otpWrapper}>
              <OTPInput value={otp} onChange={setOtp} />
            </View>

            {/* Submit */}
            <Button
              label="Verify & Enter"
              variant="brand"
              style={styles.submitButton}
              onPress={() => navigation.replace('MainTabs', { screen: 'Feed' })}
            />

            {/* Resend */}
            <Text style={styles.resendText}>
              Didn't get it? <Text style={styles.resendLink}>Resend code</Text> (60s)
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.transparent,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.transparent,
  },
  glassCard: {
    width: '100%',
    backgroundColor: colors.background.glass,
    borderRadius: 32,
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: colors.border.glass,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 28,
  },
  backText: {
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    color: colors.text.secondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 14,
  },
  title: {
    fontFamily: typography.families.ui,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '300',
    color: colors.text.secondary,
    lineHeight: 17.6,
    textAlign: 'center',
  },
  phoneNumber: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  otpWrapper: {
    marginBottom: 28,
  },
  submitButton: {
    width: '100%',
    marginBottom: 16,
  },
  resendText: {
    textAlign: 'center',
    fontFamily: typography.families.ui,
    fontSize: 9.5,
    color: colors.text.muted,
  },
  resendLink: {
    color: colors.primary.base,
    fontWeight: '500',
  },
});
