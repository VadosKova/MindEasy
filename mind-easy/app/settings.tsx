import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { NotificationsIcon } from '@/components/icons/NotificationsIcon';
import { ThemeIcon } from '@/components/icons/ThemeIcon';
import { LanguageIcon } from '@/components/icons/LanguageIcon';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';
import { requestNotificationPermission } from '@/utils/notifications';
import { syncReminders } from '@/utils/notifications';


export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('Light');
  const [language, setLanguage] = useState('English');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const toggleNotifications = async (value: boolean) => {
    if (value) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert('Permission denied');
        return;
      }
    }

    setNotificationsEnabled(value);

    await syncReminders(
      value,
      []
    );
  };


  const handleSignOut = () => {
    console.log('Sign out');
  };

  const themes = ['Light', 'Dark'];
  const languages = ['English', 'Ukrainian'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon size={28} color="#37474F" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingContent}>
            <NotificationsIcon size={30} color="#FFC01E" />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#E0E0E0', true: '#54B56E' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingContent}>
            <ThemeIcon size={30} color="#37474F" />
            <Text style={styles.settingLabel}>Theme</Text>
          </View>
          <TouchableOpacity
            style={styles.settingValue}
            onPress={() => setShowThemeMenu(!showThemeMenu)}
          >
            <Text style={styles.settingValueText}>{theme}</Text>
            <DownArrowIcon size={18} color="#37474F" />
          </TouchableOpacity>
        </View>

        {showThemeMenu && (
          <View style={styles.dropdownMenu}>
            {themes.map((t) => (
              <TouchableOpacity
                key={t}
                style={styles.menuItem}
                onPress={() => {
                  setTheme(t);
                  setShowThemeMenu(false);
                }}
              >
                <Text style={[styles.menuItemText, theme === t && styles.menuItemTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.settingCard}>
          <View style={styles.settingContent}>
            <LanguageIcon size={30} color="#80CBC5" />
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <TouchableOpacity
            style={styles.settingValue}
            onPress={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            <Text style={styles.settingValueText}>{language}</Text>
            <DownArrowIcon size={18} color="#37474F" />
          </TouchableOpacity>
        </View>

        {showLanguageMenu && (
          <View style={styles.dropdownMenu}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.menuItem}
                onPress={() => {
                  setLanguage(lang);
                  setShowLanguageMenu(false);
                }}
              >
                <Text style={[styles.menuItemText, language === lang && styles.menuItemTextActive]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    color: '#37474F',
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#263238',
    marginTop: 2,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  settingValueText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#37474F',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    marginLeft: 0,
    marginRight: 0,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#37474F',
  },
  menuItemTextActive: {
    fontFamily: 'IstokWeb_700Bold',
    color: '#54B56E',
  },
  signOutButton: {
    alignSelf: 'center',
    width: 120,
    backgroundColor: '#E50000',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#E50000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signOutButtonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
});