import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World from circles (TypeScript!)</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213E', // Circles dark theme background
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FAFBFC', // Soft off-white
    fontSize: 20,
    fontWeight: '600',
  }
});
