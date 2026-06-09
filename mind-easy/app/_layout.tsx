import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Jua_400Regular } from '@expo-google-fonts/jua';
import { IstokWeb_400Regular, IstokWeb_700Bold } from '@expo-google-fonts/istok-web';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppSettingsProvider } from "@/context/AppSettingsContext";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded, fontError] = useFonts({
    Jua_400Regular,
    IstokWeb_400Regular,
    IstokWeb_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Preserve token on app background/foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (state: AppStateStatus) => {
    if (state === 'active') {
      // App came to foreground - restore token from persistent storage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // Token expired or cleared - user will be redirected to login on next screen read
      }
    } else if (state === 'background') {
      // App going to background - ensure token is persisted
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Token is already in AsyncStorage, no action needed
      }
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppSettingsProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="registration" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="calm-breathing" options={{ headerShown: false }} />
          <Stack.Screen name="stress_relief" options={{ headerShown: false }} />
          <Stack.Screen name="focus&clarity" options={{ headerShown: false }} />
          <Stack.Screen name="sleep&relax" options={{ headerShown: false }} />
          <Stack.Screen name="breathing" options={{ headerShown: false }} />
          <Stack.Screen name="sos" options={{ headerShown: false, presentation: "fullScreenModal" }} />
          <Stack.Screen name="subscription-plan" options={{ headerShown: false }} />
          <Stack.Screen name="export-pdf" options={{ headerShown: false }} />
          <Stack.Screen name="chat-bot" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppSettingsProvider>
  );
}
