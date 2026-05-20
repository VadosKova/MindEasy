import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { AlarmClockIcon } from '@/components/icons/AlarmClockIcon';
import { CoffeeIcon } from '@/components/icons/CoffeeIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { SoundWaveIcon } from '@/components/icons/SoundWaveIcon';
import { StartFocusIcon } from '@/components/icons/StartFocusIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

const journalImage = require('@/assets/images/Journal.png');
const beatsImage = require('@/assets/images/Beats.png');

export default function FocusClarityScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>  
      <View style={styles.topBar}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.pomodoroCard, { backgroundColor: colors.card }]}> 
          <View style={styles.pomodoroHeader}>
            <View style={styles.alarmCircle}>
              <AlarmClockIcon />
            </View>
            <View style={styles.pomodoroTextBlock}>
              <Text style={[styles.pomodoroTitle, { color: colors.text }]}>Pomodoro Timer</Text>
              <Text style={[styles.pomodoroSubtitle, { color: colors.text }]}>Focus on your work, take a break, repeat.</Text>
            </View>
          </View>

          <View style={styles.timerWrapper}>
            <View style={styles.timerRing}>
              <LinearGradient
                colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.12)']}
                style={styles.timerInner}
              >
                <Text style={styles.timerValue}>25:00</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.focusButton]}>
              <View style={styles.actionIconWrap}>
                <StartFocusIcon />
              </View>
              <Text style={styles.actionText}>Focus (25 min)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.breakButton]}>
              <View style={styles.actionIconWrap}>
                <CoffeeIcon />
              </View>
              <Text style={styles.actionText}>Break (5 min)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageBackground source={journalImage} style={styles.featureCard} imageStyle={styles.featureImage}>
          <View style={styles.featureContent}>
            <View style={styles.featureHeader}>
              <View style={[styles.featureIcon, { backgroundColor: '#3C8DAD' }]}>
                <EditIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Brain Dump</Text>
            </View>
            <Text style={styles.featureDescription}>Write down everything in your mind to clear mental clutter.</Text>
            <TouchableOpacity style={[styles.featureButton, styles.featureButtonPrimary]}>
              <Text style={styles.featureButtonText}>Open Journal</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ImageBackground source={beatsImage} style={styles.featureCard} imageStyle={styles.featureImage}>
          <View style={styles.featureContent}>
            <View style={styles.featureHeader}>
              <View style={[styles.featureIcon, { backgroundColor: '#6174FB' }]}>
                <SoundWaveIcon />
              </View>
              <Text style={styles.featureTitle}>Binaural Beats</Text>
            </View>
            <Text style={styles.featureDescription}>Improve focus with calming frequency sounds.</Text>
            <TouchableOpacity style={[styles.featureButton, styles.featureButtonSecondary]}>
              <Text style={styles.featureButtonText}>Play Audio</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 18,
  },
  pomodoroCard: {
    borderRadius: 28,
    padding: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  pomodoroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  alarmCircle: {
    width: 54,
    height: 54,
    borderRadius: 28,
    backgroundColor: '#3C8DAD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroTextBlock: {
    flex: 1,
  },
  pomodoroTitle: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 18,
    marginBottom: 6,
  },
  pomodoroSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  timerWrapper: {
    alignItems: 'center',
  },
  timerRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'rgba(60,141,173,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerValue: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
    color: '#0D1F3C',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  focusButton: {
    backgroundColor: '#2F6BFF',
  },
  breakButton: {
    backgroundColor: '#2F6BFF',
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  featureCard: {
    borderRadius: 28,
    overflow: 'hidden',
    minHeight: 170,
    justifyContent: 'flex-end',
  },
  featureImage: {
    resizeMode: 'cover',
  },
  featureContent: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.76)',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 18,
    color: '#102A43',
  },
  featureDescription: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#33475B',
    marginBottom: 16,
  },
  featureButton: {
    alignSelf: 'flex-start',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  featureButtonPrimary: {
    backgroundColor: '#2F6BFF',
  },
  featureButtonSecondary: {
    backgroundColor: '#1C4B9E',
  },
  featureButtonText: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
