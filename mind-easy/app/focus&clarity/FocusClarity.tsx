import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { FocusClarityIcon } from '@/components/icons/FocusClarityIcon';
import { Colors } from '@/constants/theme';
import { translations } from '@/constants/i18n';
import { useAppSettings } from '@/context/AppSettingsContext';

const focusImage = require('@/assets/images/Focus.png');

export default function FocusClarityScreen() {
  const router = useRouter();
  const { theme, language } = useAppSettings();
  const colors = Colors[theme];
  const t = translations[language];

  const practices = [
    {
      id: 'focus-1',
      title: 'Pomodoro Focus',
      description: 'Work for 25 minutes and take a short break to sharpen concentration.',
      button: 'Start Focus',
      backgroundColor: '#E8F4FB',
    },
    {
      id: 'focus-2',
      title: 'Brain Dump',
      description: 'Write down your thoughts to clear mental clutter and stay on task.',
      button: 'Open Journal',
      backgroundColor: '#F7F3FF',
    },
    {
      id: 'focus-3',
      title: 'Binaural Beats',
      description: 'Listen to calm, focus-enhancing sounds to reduce distractions.',
      button: 'Play Audio',
      backgroundColor: '#F5F9EA',
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>  
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <FocusClarityIcon size={42} color={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t.focusClarity}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroCard, { backgroundColor: colors.card }]}> 
          <Image source={focusImage} style={styles.heroImage} resizeMode="contain" />
          <Text style={[styles.heroText, { color: colors.text }]}>Create a calm focus routine and keep clarity in your day.</Text>
        </View>

        {practices.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: item.backgroundColor }]}> 
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.cardButton} onPress={() => {}}>
              <Text style={styles.cardButtonText}>{item.button}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
  },
  backButton: {
    marginRight: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    lineHeight: 34,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 18,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  heroImage: {
    width: '100%',
    height: 160,
    marginBottom: 16,
  },
  heroText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 20,
    marginBottom: 8,
    color: '#1A1A1A',
  },
  cardDesc: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#4A4A4A',
  },
  cardButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4256FF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 14,
  },
});