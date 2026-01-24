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

  
}

const styles = StyleSheet.create({

});