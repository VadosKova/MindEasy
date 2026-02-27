import { Stack } from 'expo-router';

export default function SleepRelaxLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sleep-relax" />
    </Stack>
  );
}
