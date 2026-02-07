import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { MeditationsIcon } from '@/components/icons/MeditationsIcon';
import { TabJournalIcon } from '@/components/icons/TabJournalIcon';
import { TabProfileIcon } from '@/components/icons/TabProfileIcon';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#37474F',
        tabBarInactiveTintColor: '#37474F',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <HomeIcon size={38} active={focused} />,
        }}
      />
      <Tabs.Screen
        name="meditations"
        options={{
          title: 'Meditations',
          tabBarIcon: ({ focused }) => <MeditationsIcon size={38} active={focused} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ focused }) => <TabJournalIcon size={38} active={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabProfileIcon size={36} active={focused} />,
        }}
      />
    </Tabs>
  );
}

