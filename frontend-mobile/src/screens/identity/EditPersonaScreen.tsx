import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Tag } from '../../components/atoms/Tag';

const ToggleSwitch = ({ value, onToggle }: { value: boolean, onToggle: () => void }) => {
  const { colors } = useTheme();

  const trackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(value ? colors.primary.base : 'rgba(255,255,255,0.12)', { duration: 200 })
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(value ? 16 : 0, { duration: 200 }) }]
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onToggle}>
      <Animated.View style={[styles.switchTrack, trackStyle]}>
        <Animated.View style={[styles.switchThumb, thumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const EditPersonaScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [tags, setTags] = useState(['Design', 'SaaS', 'Architecture']);
  const [tagInput, setTagInput] = useState('');

  const [inheritLocation, setInheritLocation] = useState(true);
  const [inheritGender, setInheritGender] = useState(false);
  const [inheritDOB, setInheritDOB] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <View style={getStyles(colors).root}>

      <ScrollView
        contentContainerStyle={getStyles(colors).scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={getStyles(colors).fieldGroup}>
          <Text style={getStyles(colors).label}>ALIAS</Text>
          <Input value="Alex_UX" onChangeText={() => { }} placeholder="e.g. Alex_UX, CodeCrafter…" />
        </View>

        <View style={getStyles(colors).fieldGroup}>
          <Text style={getStyles(colors).label}>PERSONA DESCRIPTION</Text>
          <TextInput
            style={getStyles(colors).textArea}
            multiline
            numberOfLines={3}
            value="Design · SaaS · Architecture"
            placeholder="What's this persona about? Shown in your Lobby card."
            placeholderTextColor={colors.text.muted}
          />
        </View>

        {/* Inherit from Base Profile */}
        <View style={getStyles(colors).inheritCard}>
          <Text style={getStyles(colors).inheritTitle}>INHERIT FROM BASE PROFILE</Text>

          <View style={getStyles(colors).inheritRow}>
            <View>
              <Text style={getStyles(colors).inheritLabel}>Location</Text>
              <Text style={getStyles(colors).inheritValue}>Bengaluru, India</Text>
            </View>
            <ToggleSwitch value={inheritLocation} onToggle={() => setInheritLocation(!inheritLocation)} />
          </View>

          <View style={getStyles(colors).inheritRow}>
            <View>
              <Text style={getStyles(colors).inheritLabel}>Gender</Text>
              <Text style={getStyles(colors).inheritValue}>He / Him</Text>
            </View>
            <ToggleSwitch value={inheritGender} onToggle={() => setInheritGender(!inheritGender)} />
          </View>

          <View style={[getStyles(colors).inheritRow, { borderBottomWidth: 0 }]}>
            <View>
              <Text style={getStyles(colors).inheritLabel}>Date of Birth</Text>
              <Text style={getStyles(colors).inheritValue}>Apr 15, 1992</Text>
            </View>
            <ToggleSwitch value={inheritDOB} onToggle={() => setInheritDOB(!inheritDOB)} />
          </View>
        </View>

        {/* Persona Specific Contact Info */}
        <View style={getStyles(colors).fieldGroup}>
          <Text style={getStyles(colors).label}>
            PERSONA EMAIL <Text style={getStyles(colors).optionalText}>(optional)</Text>
          </Text>
          <Input
            placeholder="Separate email for this persona…"
            rightElement={
              <TouchableOpacity style={getStyles(colors).verifyBtn}>
                <Text style={getStyles(colors).verifyText}>Verify</Text>
              </TouchableOpacity>
            }
          />
        </View>

        <View style={getStyles(colors).fieldGroup}>
          <Text style={getStyles(colors).label}>
            PERSONA PHONE <Text style={getStyles(colors).optionalText}>(optional)</Text>
          </Text>
          <Input
            placeholder="Separate phone for this persona…"
            keyboardType="phone-pad"
            rightElement={
              <TouchableOpacity style={getStyles(colors).verifyBtn}>
                <Text style={getStyles(colors).verifyText}>Verify</Text>
              </TouchableOpacity>
            }
          />
        </View>

        <View style={getStyles(colors).fieldGroup}>
          <Text style={getStyles(colors).label}>
            INTEREST TAGS <Text style={getStyles(colors).optionalText}>min 2 · max 10</Text>
          </Text>
          <Input
            placeholder="Type a tag and press Add…"
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={handleAddTag}
            rightElement={
              <TouchableOpacity style={getStyles(colors).verifyBtn} onPress={handleAddTag}>
                <Text style={getStyles(colors).addText}>Add</Text>
              </TouchableOpacity>
            }
          />

          <View style={getStyles(colors).tagList}>
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                variant="ghost"
                onPress={() => handleRemoveTag(tag)}
              />
            ))}
          </View>
          <Text style={getStyles(colors).helperText}>Tap any tag to remove it</Text>
        </View>

        <Button
          variant="brand"
          label="Save Persona"
          style={getStyles(colors).saveBtn}
          onPress={() => navigation.goBack()}
        />

      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  switchTrack: {
    width: 36,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

const getStyles = (colors: Colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.transparent,
  },
  header: {
    height: 90,
    paddingTop: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(5,7,10,0.80)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    zIndex: 10,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: typography.families.ui,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  publicBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(92,148,233,0.10)',
    borderColor: 'rgba(92,148,233,0.25)',
    borderWidth: 0.5,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  publicText: {
    fontFamily: typography.families.ui,
    fontSize: 7.5,
    fontWeight: '600',
    color: colors.primary.base,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.40)',
    letterSpacing: 1,
    paddingLeft: 4,
  },
  optionalText: {
    color: 'rgba(255,255,255,0.22)',
    fontWeight: '400',
    textTransform: 'none',
    letterSpacing: 0,
  },
  textArea: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 13,
    color: colors.text.primary,
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  verifyBtn: {
    padding: 4,
  },
  verifyText: {
    fontFamily: typography.families.ui,
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.status.error,
    letterSpacing: 0.2,
  },
  addText: {
    fontFamily: typography.families.ui,
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.primary.base,
    letterSpacing: 0.2,
  },
  inheritCard: {
    backgroundColor: colors.background.glass,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.glass,
  },
  inheritTitle: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1,
    marginBottom: 12,
  },
  inheritRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  inheritLabel: {
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    fontWeight: '500',
    color: colors.text.primary,
  },
  inheritValue: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 1,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 2,
  },
  helperText: {
    fontFamily: typography.families.ui,
    fontSize: 8,
    color: 'rgba(255,255,255,0.25)',
    paddingLeft: 4,
  },
  saveBtn: {
    marginTop: 4,
  },
});
