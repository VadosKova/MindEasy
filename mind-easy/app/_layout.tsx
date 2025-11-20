import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Jua_400Regular } from '@expo-google-fonts/jua';
import { IstokWeb_400Regular, IstokWeb_700Bold } from '@expo-google-fonts/istok-web';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded, fontError] = useFonts({
    Jua_400Regular,
    IstokWeb_400Regular,
    IstokWeb_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5DC' }}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="registration" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
