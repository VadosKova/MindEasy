import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { LeaveIcon } from '@/components/icons/LeaveIcon';
import { BodyScanIcon } from '@/components/icons/BodyScanIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

export default function StressReliefScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];

  const exercises = [
    {
      id: 'grounding',
      title: 'Grounding 5-4-3-2-1',
      description: 'Connect with your senses to return to the present moment.',
      buttonText: 'Start Practise',
      color: '#E8F5E9',
      btnColor: '#5D865F',
      image: require('@/assets/images/Grounding.png'),
    },
    {
      id: 'bodyscan',
      title: 'Body Scan',
      description: 'A guided audio to relax your body from head to toe.',
      buttonText: 'Play Audio',
      color: '#F3E5F5',
      btnColor: '#8C75B3',
      image: require('@/assets/images/BodyScan.png'),
    },
    {
      id: 'shake',
      title: 'Shake it off',
      description: 'Release built-up tension with a quick movement break.',
      buttonText: 'Start Now',
      color: '#FFF3E0',
      btnColor: '#E4A63F',
      image: require('@/assets/images/Shake.png'),
    }
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {exercises.map((item) => (
          <ImageBackground
            key={item.id}
            source={item.image}
            style={[styles.card, { backgroundColor: item.color }]}
            imageStyle={styles.cardBackground}
            resizeMode="contain"
          >
            <View style={[styles.cardOverlay, item.id === 'shake' && styles.shakeOverlay]}>
              {(item.id === 'grounding' || item.id === 'bodyscan') && (
                <View
                  style={[
                    styles.iconCircle,
                    item.id === 'grounding' ? styles.groundIcon : styles.bodyIcon,
                  ]}
                >
                  {item.id === 'grounding' ? (
                    <LeaveIcon size={30} color="#FFFFFF" />
                  ) : (
                    <BodyScanIcon size={30} color="#FFFFFF" />
                  )}
                </View>
              )}
              <View style={styles.textBlock}>
                <Text style={[styles.cardTitle, item.id === 'shake' && styles.shakeTitle]}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.button,
                  { backgroundColor: item.btnColor },
                  (item.id === 'grounding' || item.id === 'bodyscan') && styles.buttonLower,
                ]}
                onPress={() => {/*test*/}}
              >
                <Text style={styles.buttonText}>{item.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 24,
    marginBottom: 20,
    height: 220,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  cardBackground: {
    resizeMode: 'contain',
    width: '110%',
    height: '110%',
    backgroundColor: '#F5F5DC',
  },
  cardOverlay: {
    padding: 20,
    justifyContent: 'flex-start',
    minHeight: 180,
    alignItems: 'flex-start',
  },
  shakeOverlay: {
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    marginTop: -30,
  },
  groundIcon: {
    backgroundColor: '#5D865F',
  },
  bodyIcon: {
    backgroundColor: '#8C75B3',
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
    width: '90%',
  },
  cardTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 22,
    color: '#1A1A1A',
    marginBottom: 16,
    marginTop: -16,
  },
  shakeTitle: {
    marginTop: 12,
  },
  cardDesc: {
    width: '70%',
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 16,
    marginTop: -14,
    lineHeight: 20,
  },
  buttonLower: {
    marginTop: 30,
  },
  button: {
    width: 150,
    height: 40,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Jua_400Regular',
    alignSelf: 'center',
    fontSize: 16,
  },
  cardImage: {
    width: 120,
    height: 120,
  },
});