import { Stack } from 'expo-router';

export default function StressReliefLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StressReliefMain" />
    </Stack>
  );
}
