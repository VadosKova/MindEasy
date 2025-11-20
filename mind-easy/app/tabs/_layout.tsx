import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? '#8CCAED' : '#8CCAED',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#78909C' : '#78909C',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#E0E0E0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="meditations"
        options={{
          title: 'Meditations',
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

