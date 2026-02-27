import { Stack } from 'expo-router';

export default function SleepRelaxLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sleep-relax"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
