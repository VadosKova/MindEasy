import { Stack } from 'expo-router';

export default function StressReliefLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StressReliefMain" />
      <Stack.Screen name="grounding" />
      <Stack.Screen name="body-scan" />
      <Stack.Screen name="shake-it-off" />
    </Stack>
  );
}
