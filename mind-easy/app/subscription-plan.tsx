import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { UnlockIcon } from '@/components/icons/UnlockIcon';
import { StarIcon } from '@/components/icons/StarIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

export default function SubscriptionPlanScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Choose your plan</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
          <View style={styles.rowCenter}>
            <UnlockIcon size={18} color="#37474F" />
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
          <View style={styles.rowCenter}>
            <UnlockIcon size={18} color="#37474F" />
            <Text style={styles.planSubtitleWithIcon}>Unlock everything</Text>
          </View>
          <TouchableOpacity style={styles.upgradeYellow}>
            <Text style={styles.upgradeYellowText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    maxHeight: 220,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  topRight: {
    position: 'absolute',
    top: 16,
    right: 0,
  },
  popularBadge: {
    backgroundColor: '#1465E7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 16,
  },
  popularText: {
    color: '#FFF',
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 17,
  },
  starWrap: { marginBottom: 16 },
  planTitle: {
    fontFamily: 'Jua_400Regular',
    color: '#000',
    fontSize: 32,
    marginTop: 4,
  },
  planSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: '#78909C',
    marginTop: 6,
    marginBottom: 16,
  },
  rowCenter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 2, 
    marginBottom: 16 
  },
  planSubtitleWithIcon: { 
    fontFamily: 'IstokWeb_400Regular', 
    fontSize: 15, 
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
