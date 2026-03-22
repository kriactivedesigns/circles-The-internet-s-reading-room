import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  Easing as ReanimatedEasing,
  interpolate
} from 'react-native-reanimated';
import Svg, { Circle, G, Defs, RadialGradient, Stop, Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/molecules/Header';
import { radii } from '../../theme/radii';

const { width, height } = Dimensions.get('window');

const FloatingPersona: React.FC<{ 
  initial: string; 
  color: string; 
  note?: string; 
  delay?: number; 
}> = ({ initial, color, note, delay = 0 }) => {
  const { colors } = useTheme();
  const driftX = useSharedValue(0);
  const driftY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const durationX = 6000 + delay;
    const durationY = 8000 + (delay * 0.5);

    driftX.value = withRepeat(
      withSequence(
        withTiming(15, { duration: durationX, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) }),
        withTiming(-15, { duration: durationX, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) }),
        withTiming(0, { duration: durationX, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) })
      ),
      -1,
      false
    );

    driftY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: durationY, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) }),
        withTiming(-10, { duration: durationY, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) }),
        withTiming(0, { duration: durationY, easing: ReanimatedEasing.bezier(0.445, 0.05, 0.55, 0.95) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: driftX.value },
      { translateY: driftY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={[styles.personaContainer, animatedStyle]}>
      {note && (
        <View style={[styles.noteBubble, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
           <Text style={[styles.noteText, { color: colors.text.secondary }]}>"{note}"</Text>
           <TouchableOpacity style={styles.handshakeSmall}>
              <Text style={styles.handshakeEmoji}>🤝</Text>
           </TouchableOpacity>
        </View>
      )}
      <View style={[styles.avatarGlow, { backgroundColor: color + '10' }]} />
      <View style={[styles.avatar, { borderColor: color, backgroundColor: colors.background.base }]}>
        <Text style={[styles.avatarText, { color }]}>{initial}</Text>
      </View>
    </Animated.View>
  );
};

export const SandboxScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const [isJoined, setIsJoined] = useState(false);

  return (
    <View style={styles.container}>
      {/* ── Background Orbs ── */}
      <View style={StyleSheet.absoluteFill}>
         <Svg height="100%" width="100%">
            <Defs>
              <RadialGradient id="grad1" cx="20%" cy="30%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor={colors.primary.base} stopOpacity="0.08" />
                <Stop offset="100%" stopColor={colors.primary.base} stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
         </Svg>
      </View>

      {/* Render Circles Based on type */}
      <View style={styles.canvas}>
        <Svg style={StyleSheet.absoluteFill}>
          {/* Main Circle Rings */}
          <G opacity={isJoined ? 0.4 : 0.15}>
            <Circle cx={width/2} cy={height*0.42} r="140" stroke={colors.text.primary} strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <Circle cx={width/2} cy={height*0.42} r="110" stroke={colors.text.primary} strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <Circle cx={width/2} cy={height*0.42} r="3" fill={colors.text.primary} />
          </G>
        </Svg>

        {/* Floating Personas */}
        <View style={{ position: 'absolute', top: height * 0.25, left: width * 0.15 }}>
          <FloatingPersona initial="K" color="#34d399" note="Anyone moved from Figma straight to code?" delay={0} />
        </View>
        
        <View style={{ position: 'absolute', top: height * 0.6, left: width * 0.6 }}>
          <FloatingPersona initial="M" color="#f472b6" delay={2000} />
        </View>

        <View style={{ position: 'absolute', top: height * 0.35, left: width * 0.7 }}>
          <FloatingPersona initial="D" color="#61dafb" delay={4000} />
        </View>

        {/* User Persona (Centered) */}
        {!isJoined && (
          <View style={[styles.centerPersona, { top: height * 0.42 - 38 }]}>
             <View style={[styles.userAvatar, { borderColor: colors.primary.base }]}>
                <Text style={[styles.userAvatarText, { color: colors.primary.base }]}>A</Text>
             </View>
          </View>
        )}
      </View>

      {/* ── Bottom Controls ── */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bottomArea}>
        {!isJoined ? (
          <View style={[styles.noteBar, { backgroundColor: colors.background.surface, borderColor: colors.border.glass }]}>
            <View style={[styles.miniAvatar, { borderColor: colors.primary.base }]}>
              <Text style={[styles.miniAvatarText, { color: colors.primary.base }]}>A</Text>
            </View>
            <TextInput 
              style={[styles.noteInput, { color: colors.text.primary }]} 
              placeholder="Drop an open note..." 
              placeholderTextColor={colors.text.muted}
            />
            <TouchableOpacity 
              onPress={() => setIsJoined(true)}
              style={[styles.sendBtn, { backgroundColor: colors.primary.base }]}
            >
               <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? colors.background.base : '#fff'} strokeWidth="3">
                 <Path d="M12 19V5M12 5L5 12M12 5L19 12" strokeLinecap="round" strokeLinejoin="round" />
               </Svg>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sessionControls}>
            <TouchableOpacity style={styles.controlBtn}>
               <Text style={styles.controlIcon}>🎙️</Text>
               <Text style={styles.controlLabel}>Mute</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.bloomBtn, { backgroundColor: colors.primary.base }]}>
               <Text style={styles.bloomText}>Bloom</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setIsJoined(false)} style={styles.controlBtn}>
               <Text style={styles.controlIcon}>🚪</Text>
               <Text style={styles.controlLabel}>Leave</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: { flex: 1 },
  personaContainer: { alignItems: 'center', zIndex: 10 },
  noteBubble: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 0.5,
    width: 160,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteText: { fontFamily: typography.families.ui, fontSize: 10.5, lineHeight: 15, fontStyle: 'italic', flex: 1 },
  handshakeSmall: { marginLeft: 8 },
  handshakeEmoji: { fontSize: 14 },
  avatarGlow: { position: 'absolute', width: 60, height: 60, borderRadius: 30, top: -7 },
  avatar: { width: 46, height: 46, borderRadius: 23, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: typography.families.ui, fontSize: 16, fontWeight: '700' },

  centerPersona: { position: 'absolute', left: width/2 - 38, alignItems: 'center' },
  userAvatar: { 
    width: 76, height: 76, borderRadius: 38, borderWidth: 2, 
    justifyContent: 'center', alignItems: 'center', 
    backgroundColor: 'rgba(92,148,233,0.1)' 
  },
  userAvatarText: { fontFamily: typography.families.ui, fontSize: 24, fontWeight: '700' },

  bottomArea: { position: 'absolute', bottom: 40, left: 16, right: 16, zIndex: 150 },
  noteBar: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 999, borderWidth: 1 },
  miniAvatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  miniAvatarText: { fontSize: 11, fontWeight: '700' },
  noteInput: { flex: 1, marginLeft: 12, fontSize: 12, fontFamily: typography.families.ui },
  sendBtn: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },

  sessionControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  controlBtn: { alignItems: 'center', width: 60 },
  controlIcon: { fontSize: 20, marginBottom: 4 },
  controlLabel: { fontFamily: typography.families.ui, fontSize: 9, fontWeight: '600' },
  bloomBtn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: radii.pill },
  bloomText: { fontFamily: typography.families.ui, fontSize: 13, fontWeight: '700', color: '#fff' },
});
