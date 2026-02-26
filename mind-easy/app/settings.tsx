import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { CustomSwitch } from '@/components/CustomSwitch';
import { NotificationsIcon } from '@/components/icons/NotificationsIcon';
import { ThemeIcon } from '@/components/icons/ThemeIcon';
import { LanguageIcon } from '@/components/icons/LanguageIcon';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';
import { Image } from 'react-native';
import { AiIcon } from '@/components/icons/AiIcon';
import { ChatbotIcon } from '@/components/icons/ChatbotIcon';
import { StarIcon } from '@/components/icons/StarIcon';
import { RightArrowIcon } from '@/components/icons/RightArrowIcon';
import { requestNotificationPermission } from '@/utils/notifications';
import { syncReminders } from '@/utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cancelAllNotifications } from '@/utils/notifications';
import { useAppSettings, Theme, Language } from "@/context/AppSettingsContext";
import { Colors } from '@/constants/theme';
import { translations } from "@/constants/i18n";


export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, language, setTheme, setLanguage } = useAppSettings();
  const colors = Colors[theme];
  const t = translations[language];
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(false);

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
    Alert.alert(
    t.signOut,
    'Are you sure you want to sign out?',
    [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.signOut,
        style: 'destructive',
        onPress: async () => {
          await cancelAllNotifications();
          await AsyncStorage.clear();
          router.replace('/login');
        },
      },
    ]
  );
  };

  const themes: Theme[] = ['Light', 'Dark'];
  const languages: Language[] = ['English', 'Ukrainian'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t.settings}</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.settingCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/subscription-plan')}
        >
          <View style={styles.settingContent}>
            <StarIcon size={30} color="#BDBDBD" />
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Current Plan: Basic
            </Text>
          </View>
          <RightArrowIcon size={30} color={colors.text} />
        </TouchableOpacity>

        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingContent}>
            <NotificationsIcon size={30} color="#FFC01E" />
            <Text style={[styles.settingLabel, { color: colors.text }]}>{t.notifications}</Text>
          </View>
          <CustomSwitch value={notificationsEnabled} onValueChange={toggleNotifications} trackColor={{ false: '#363935', true: '#2DB200' }} thumbColor="#FFFFFF" />
        </View>

        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingContent}>
            <ThemeIcon size={30} color={colors.text} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>{t.theme}</Text>
          </View>
          <TouchableOpacity style={styles.settingValue} onPress={() => setShowThemeMenu(!showThemeMenu)}>
            <Text style={styles.settingValueText}>{theme}</Text>
            <DownArrowIcon size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        {showThemeMenu && (
          <View style={[styles.dropdownMenu, { backgroundColor: colors.card }]}>
            {themes.map((t) => (
              <TouchableOpacity key={t} style={styles.menuItem} onPress={() => { setTheme(t); setShowThemeMenu(false); }}>
                <Text style={[styles.menuItemText, { color: colors.text }, theme === t && styles.menuItemTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingContent}>
            <LanguageIcon size={30} color="#80CBC5" />
            <Text style={[styles.settingLabel, { color: colors.text }]}>{t.language}</Text>
          </View>
          <TouchableOpacity style={styles.settingValue} onPress={() => setShowLanguageMenu(!showLanguageMenu)}>
            <Text style={styles.settingValueText}>{language}</Text>
            <DownArrowIcon size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        {showLanguageMenu && (
          <View style={[styles.dropdownMenu, { backgroundColor: colors.card }]}>
            {languages.map((lang) => (
              <TouchableOpacity key={lang} style={styles.menuItem} onPress={() => { setLanguage(lang); setShowLanguageMenu(false); }}>
                <Text style={[styles.menuItemText, { color: colors.text }, language === lang && styles.menuItemTextActive]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingContent}>
            <AiIcon size={30} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              AI Journal Analysis
            </Text>
          </View>
          <CustomSwitch
            value={aiAnalysisEnabled}
            onValueChange={setAiAnalysisEnabled}
            trackColor={{ false: '#363935', true: '#2DB200' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={[styles.settingCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/export-pdf')}
        >
          <View style={styles.settingContent}>
            <Image
              source={require('../assets/images/PDFIcon.png')}
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
            />
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Export PDF report
            </Text>
          </View>
          <RightArrowIcon size={30} color="#37474F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/chat-bot')}
        >
          <View style={styles.settingContent}>
            <ChatbotIcon size={30} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              MindEasy chatbot
            </Text>
          </View>
          <RightArrowIcon size={30} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>{t.signOut}</Text>
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
    fontSize: 15,
    color: '#37474F',
  },
  dropdownMenu: {
    width: "50%",
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-end',
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
    alignSelf: 'center',
  },
  menuItemText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 15,
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