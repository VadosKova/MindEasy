import { Stack } from 'expo-router';

export default function FocusClarityLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FocusClarity" />
    </Stack>
  );
}
