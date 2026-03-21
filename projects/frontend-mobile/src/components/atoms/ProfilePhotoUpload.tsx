import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';

export const ProfilePhotoUpload: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dashedCircle} activeOpacity={0.7}>
        <Svg width="24" height="24" fill="none" stroke={colors.text.muted} strokeWidth="1.5" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <Circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.plusButton} activeOpacity={0.8}>
        <Svg width="12" height="12" fill="white" viewBox="0 0 24 24">
          <Path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  dashedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: colors.text.muted,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: colors.primary.base,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.base,
  },
});
