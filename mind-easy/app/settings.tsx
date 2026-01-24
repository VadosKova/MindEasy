import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { NotificationsIcon } from '@/components/icons/NotificationsIcon';
import { ThemeIcon } from '@/components/icons/ThemeIcon';
import { LanguageIcon } from '@/components/icons/LanguageIcon';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';


export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('Light');
  const [language, setLanguage] = useState('English');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleSignOut = () => {
    console.log('Sign out');
  };

  const themes = ['Light', 'Dark'];
  const languages = ['English', 'Russian', 'Spanish', 'French'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon size={28} color="#37474F" />
          </TouchableOpacity>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    color: '#263238',
  },
});