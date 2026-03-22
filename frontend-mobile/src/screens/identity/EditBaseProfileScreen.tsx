import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Tag } from '../../components/atoms/Tag';

export const EditBaseProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation<any>();

  const [tags, setTags] = useState(['Design', 'Reading', 'Jazz']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <View style={styles.root}>


      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Upload */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.8}>
              <Svg width="10" height="10" fill="white" viewBox="0 0 24 24">
                <Path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>FULL NAME</Text>
          <Input value="Alexandre Smith" onChangeText={() => { }} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <Input
            value="alex@causalsyntax.com"
            onChangeText={() => { }}
            rightElement={
              <TouchableOpacity style={styles.verifyBtn}>
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
            }
          />
          <Text style={styles.helperText}>Changes require OTP verification</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>PHONE</Text>
          <Input
            value="+91 98765 43210"
            onChangeText={() => { }}
            keyboardType="phone-pad"
            rightElement={
              <TouchableOpacity style={styles.verifyBtn}>
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
            }
          />
          <Text style={styles.helperText}>Changes require OTP verification</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>GENDER</Text>
            <Input value="He / Him" onChangeText={() => { }} />
          </View>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>DATE OF BIRTH</Text>
            <Input value="1992-04-15" onChangeText={() => { }} />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>LOCATION</Text>
          <Input value="Bengaluru, India" onChangeText={() => { }} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>ABOUT YOU</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value='"Builder, reader, occasional jazz snob. Thinking about third places in digital spaces."'
            placeholderTextColor={colors.text.muted}
          />
        </View>

        {/* Tags */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>INTEREST TAGS</Text>
          <Input
            placeholder="Type a tag and press Add…"
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={handleAddTag}
            rightElement={
              <TouchableOpacity style={styles.verifyBtn} onPress={handleAddTag}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            }
          />

          <View style={styles.tagList}>
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                variant="primary"
                onPress={() => handleRemoveTag(tag)}
              />
            ))}
          </View>
          <Text style={styles.helperText}>Tap any tag to remove it</Text>
        </View>

        <Button
          variant="brand"
          label="Save Changes"
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
        />

      </ScrollView>
    </View>
  );
};

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
  privateBadge: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  privateText: {
    fontFamily: typography.families.ui,
    fontSize: 7.5,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1a3060',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(92,148,233,0.40)',
  },
  avatarText: {
    fontFamily: typography.families.ui,
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary.base,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary.base,
    borderWidth: 2,
    borderColor: '#05070A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldGroup: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    fontFamily: typography.families.ui,
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.40)',
    letterSpacing: 1,
    paddingLeft: 4,
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
  helperText: {
    fontFamily: typography.families.ui,
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.28)',
    paddingLeft: 4,
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 2,
  },
  saveBtn: {
    marginTop: 8,
  },
});
