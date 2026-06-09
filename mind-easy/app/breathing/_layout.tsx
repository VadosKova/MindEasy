import { Stack } from 'expo-router';

export default function BreathingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="breathing-exercises"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
