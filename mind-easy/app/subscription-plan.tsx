import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { BackIcon } from '@/components/icons/BackIcon';
import { UnlockIcon } from '@/components/icons/UnlockIcon';
import { StarIcon } from '@/components/icons/StarIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';
import { translations } from '@/constants/i18n';

export default function SubscriptionPlanScreen() {
  const router = useRouter();
  const { theme, language } = useAppSettings();
  const colors = Colors[theme];
  const t = translations[language];

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hapticIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let step = 0;
    hapticIntervalRef.current = setInterval(() => {
      step++;
      if (step < 5) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      else if (step < 10) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 200);

    timerRef.current = setTimeout(() => {
      cleanupSOS();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/sos");
    }, 3000);
  };

  const cancelPress = () => {
    cleanupSOS();
  };

  const cleanupSOS = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
  };

  useEffect(() => {
    return () => cleanupSOS();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Pressable 
        style={{ flex: 1 }} 
        onLongPress={handlePressIn}
        delayLongPress={500}
        onPressOut={cancelPress}
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Choose your plan</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <View style={[styles.planCard, { backgroundColor: colors.card }]}>
          <View style={styles.topRight}>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          </View>
          <View style={styles.starWrap}>
            <StarIcon size={40} color="#BDBDBD" />
          </View>
          <Text style={[styles.planTitle, { color: colors.text }]}>Basic</Text>
          <Text style={styles.planSubtitle}>Current Plan</Text>
          <TouchableOpacity style={styles.selectedPill}>
            <Text style={styles.selectedPillText}>Selected</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.planCard, { backgroundColor: colors.card }]}>
          <View style={styles.starWrap}>
            <StarIcon size={40} color="#0D3B8C" />
          </View>
          <Text style={[styles.planTitle, { color: colors.text }]}>Standard</Text>
          <Text style={[styles.priceText, { color: colors.text }]}>159 ₴/month</Text>
          <View style={styles.rowCenter}>
            <UnlockIcon size={25} color="#37474F" />
            <Text style={styles.planSubtitleWithIcon}>Export PDF report</Text>
          </View>
          <TouchableOpacity style={styles.upgradeBlue}>
            <Text style={styles.upgradeBlueText}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.planCard, { backgroundColor: colors.card }]}>
          <View style={styles.starWrap}>
            <StarIcon size={40} color="#FFC01E" />
          </View>
          <Text style={[styles.planTitle, { color: colors.text }]}>Premium</Text>
          <Text style={[styles.priceText, { color: colors.text }]}>269 ₴/year</Text>
          <View style={styles.rowCenter}>
            <UnlockIcon size={25} color="#37474F" />
            <Text style={styles.planSubtitleWithIcon}>Unlock everything</Text>
          </View>
          <TouchableOpacity style={styles.upgradeYellow}>
            <Text style={styles.upgradeYellowText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: { width: 36, alignItems: 'flex-start' },
  headerTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
  },
  content: { padding: 15, paddingBottom: 20 },
  planCard: {
    backgroundColor: '#FFF',
    width: 328,
    maxHeight: 200,
    borderTopLeftRadius: 23,
    borderBottomLeftRadius: 23, 
    borderBottomRightRadius: 23,
    borderTopRightRadius: 23,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.5,
    shadowRadius: 23,
    elevation: 8,
    position: 'relative',
  },
  topRight: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  popularBadge: {
    width: 98,
    height: 35,
    backgroundColor: '#1465E7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  popularText: {
    color: '#FFF',
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 17,
  },
  starWrap: { marginBottom: 2 },
  planTitle: {
    fontFamily: 'Jua_400Regular',
    color: '#000',
    fontSize: 32,
    marginTop: 4,
  },
  priceText: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 20,
    color: '#1465E7',
    marginTop: 6,
    marginBottom: 12,
  },
  planSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 18,
    color: '#78909C',
    marginTop: 6,
    marginBottom: 16,
  },
  rowCenter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 2, 
    marginBottom: 16,
    marginRight: 17, 
  },
  planSubtitleWithIcon: { 
    fontFamily: 'IstokWeb_400Regular', 
    fontSize: 18, 
    textAlign: 'center',
    alignSelf: 'center',
    color: '#9E9E9E' 
  },
  selectedPill: {
    backgroundColor: '#BBBBBB',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 15,
  },
  selectedPillText: { 
    color: '#FFF', 
    fontFamily: 'IstokWeb_700Bold' 
  },
  upgradeBlue: {
    backgroundColor: '#0D3B8C',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 18,
  },
  upgradeBlueText: { 
    color: '#FFF', 
    fontFamily: 'IstokWeb_700Bold' 
  },
  upgradeYellow: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 18,
  },
  upgradeYellowText: { 
    color: '#FFF', 
    fontFamily: 'IstokWeb_700Bold' 
  },
});
