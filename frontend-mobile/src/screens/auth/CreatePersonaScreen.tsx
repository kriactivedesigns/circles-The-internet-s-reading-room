import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/atoms/Button';
import { Tag } from '../../components/atoms/Tag';
import { AvatarPicker } from '../../components/molecules/AvatarPicker';
import { LabeledInput } from '../../components/molecules/LabeledInput';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

const INTERESTS = [
  'UX Design', 'Architecture', 'SaaS', 'AI / ML', 'Indie Hacking',
  'Writing', 'Photography', 'Jazz', 'Philosophy', 'Fiction',
  'Climate', 'Fintech'
];

export const CreatePersonaScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  const [selectedAvatar, setSelectedAvatar] = useState('A');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['UX Design', 'Architecture', 'SaaS']);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.badge}>Public Identity</Text>
            <Text style={styles.title}>Create your first Persona</Text>
            <Text style={styles.subtitle}>
              This is how others will see you in a Lobby. You can add more Personas later.
            </Text>
          </View>

          {/* Avatar selection */}
          <View style={styles.section}>
            <AvatarPicker selectedId={selectedAvatar} onSelect={setSelectedAvatar} />
          </View>

          {/* Alias */}
          <View style={styles.section}>
            <LabeledInput
              label="Persona alias"
              placeholder="e.g. Alex_UX, CodeCrafter, InkWalker..."
              defaultValue="Alex_UX"
            />
          </View>

          {/* Interest tags */}
          <View style={styles.section}>
            <View style={styles.tagsHeader}>
              <Text style={styles.tagsLabel}>Interest tags</Text>
              <Text style={styles.tagsCount}>
                min 2, max 10 · <Text style={styles.selectedCount}>{selectedInterests.length} selected</Text>
              </Text>
            </View>
            <View style={styles.tagsGrid}>
              {INTERESTS.map((interest) => (
                <Tag
                  key={interest}
                  label={interest}
                  selected={selectedInterests.includes(interest)}
                  onPress={() => toggleInterest(interest)}
                />
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              label="Enter circles →"
              variant="brand"
              style={styles.completeButton}
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
    backgroundColor: colors.background.transparent,
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
  badge: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.primary.base,
    marginBottom: 8,
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
  section: {
    marginBottom: 20,
  },
  tagsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  tagsLabel: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagsCount: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    color: 'rgba(255, 255, 255, 0.25)',
  },
  selectedCount: {
    color: colors.primary.base,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
  },
  completeButton: {
    width: '100%',
  },
});
