import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';
import { FeedWallScreen } from './src/screens/feed/FeedWallScreen';
import { OrbitScreen } from './src/screens/orbit/OrbitScreen';
import { ShelfScreen } from './src/screens/shelf/ShelfScreen';
import { SandboxScreen } from './src/screens/sandbox/SandboxScreen';
import { BottomNav } from './src/components/molecules/BottomNav';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { AmbientBackground } from './src/components/atoms/AmbientBackground';
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = ({ scrollY }: { scrollY: Animated.Value }) => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <BottomNav {...props} scrollY={scrollY} />}
      screenOptions={{
        headerShown: false,
      }}
      // @ts-ignore
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedWallScreen}
        initialParams={{ scrollY }}
      />
      <Tab.Screen name="Orbit" component={OrbitScreen} />
      <Tab.Screen name="Shelf" component={ShelfScreen} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const { isDark } = useTheme();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const NavigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      card: 'transparent',
      border: 'transparent',
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <AmbientBackground />
      <NavigationContainer theme={NavigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' }
          }}
        >
          <Stack.Screen name="MainTabs">
            {(props) => <MainTabs {...props} scrollY={scrollY} />}
          </Stack.Screen>
          <Stack.Screen
            name="Sandbox"
            component={SandboxScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

// Supporting View import
import { View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
