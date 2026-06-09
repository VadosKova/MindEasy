import { Stack } from "expo-router";

export default function SOSLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "fade",
        presentation: "fullScreenModal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="body" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="support" />
      <Stack.Screen name="finish" />
    </Stack>
  );
}