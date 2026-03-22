import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { FeedWallScreen } from './src/screens/feed/FeedWallScreen';
import { OrbitScreen } from './src/screens/orbit/OrbitScreen';
import { ShelfScreen } from './src/screens/shelf/ShelfScreen';
import { SandboxScreen } from './src/screens/sandbox/SandboxScreen';
import { BottomNav } from './src/components/molecules/BottomNav';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { AmbientBackground } from './src/components/atoms/AmbientBackground';
import { Header } from './src/components/molecules/Header';
import { useNavigationContainerRef } from '@react-navigation/native';
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

const MainTabs = ({ scrollY }: { scrollY: any }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Modern
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
  const scrollY = useSharedValue(0);
  const navigationRef = useNavigationContainerRef();
  const [routeName, setRouteName] = React.useState<string>('Feed');
  const [canGoBack, setCanGoBack] = React.useState(false);

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
    <View style={{ flex: 1, backgroundColor: isDark ? '#05070A' : '#F2F4F7' }}>
      <AmbientBackground />
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onStateChange={() => {
          const currentRoute = navigationRef.getCurrentRoute();
          setRouteName(currentRoute?.name || 'Feed');
          setCanGoBack(navigationRef.canGoBack());
        }}
      >
        <View style={{ flex: 1 }}>
          <Header
            routeName={routeName}
            canGoBack={canGoBack}
            onBack={() => navigationRef.goBack()}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' }
            }}
          >
            <Stack.Screen
              name="MainTabs"
              options={{ headerShown: false }}
            >
              {(props) => <MainTabs {...props} scrollY={scrollY} />}
            </Stack.Screen>
            <Stack.Screen
              name="Sandbox"
              component={SandboxScreen}
              options={{
                animation: 'slide_from_right',
                title: 'Sandbox'
              }}
            />
          </Stack.Navigator>
          <BottomNav
            routeName={routeName}
            scrollY={scrollY}
            onTabPress={(name) => {
              (navigationRef as any).navigate('MainTabs', { screen: name });
            }}
          />
        </View>
      </NavigationContainer>
    </View>
  );
};

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
