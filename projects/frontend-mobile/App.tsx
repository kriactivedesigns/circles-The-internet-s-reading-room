import { SplashScreen } from './src/screens/auth/SplashScreen';
import { FeedWallScreen } from './src/screens/feed/FeedWallScreen';
import { ThemeProvider } from './src/theme/ThemeContext';
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_600SemiBold,
  Raleway_700Bold
} from '@expo-google-fonts/raleway';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Await font loading to prevent ugly raw system-font flashes
  }

  return (
    <ThemeProvider>
      <FeedWallScreen />
    </ThemeProvider>
  );
}
