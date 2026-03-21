import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darkColors } from '../../theme/colors';

export const AmbientBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          // A very subtle deep blue/indigo tint at the top
          '#0A1324', 
          // Fading instantly into the deep base black
          darkColors.background.base, 
          darkColors.background.base,
          // A tiny hint of reflection at the very bottom
          '#08101C'
        ]}
        locations={[0, 0.4, 0.8, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: darkColors.background.base,
  },
});
