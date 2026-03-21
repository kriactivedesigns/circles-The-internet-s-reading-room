import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface AvatarOption {
  id: string;
  label: string;
  bgColor: string;
  textColor: string;
}

const AVATARS: AvatarOption[] = [
  { id: 'A', label: 'A', bgColor: '#1a1a3a', textColor: '#8899ee' },
  { id: 'B', label: 'B', bgColor: '#1a3a2a', textColor: '#55cc88' },
  { id: 'C', label: 'C', bgColor: '#3a1a2a', textColor: '#ee6688' },
  { id: 'D', label: 'D', bgColor: '#2a2a1a', textColor: '#ddcc55' },
];

interface AvatarPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedId, onSelect }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose avatar</Text>
      <View style={styles.avatarRow}>
        {AVATARS.map((avatar) => {
          const isSelected = avatar.id === selectedId;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarCircle,
                { backgroundColor: avatar.bgColor },
                isSelected && styles.selectedAvatar
              ]}
              onPress={() => onSelect(avatar.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.avatarText, { color: avatar.textColor }]}>
                {avatar.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        
        {/* Refresh/Custom Option */}
        <TouchableOpacity style={styles.customCircle} activeOpacity={0.7}>
          <Svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.background.glass,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border.glassLight,
  },
  label: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    opacity: 0.6,
  },
  selectedAvatar: {
    borderColor: colors.primary.base,
    borderWidth: 2.5,
    opacity: 1,
    // Note: React Native shadow is different from box-shadow 0 0 0 4px rgba(92,148,233,0.20)
    // We'll use shadow properties or just the border for now.
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontFamily: typography.families.ui,
    fontSize: 16,
    fontWeight: '700',
  },
  customCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
});
