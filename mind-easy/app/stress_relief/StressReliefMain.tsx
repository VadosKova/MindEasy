import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
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
            style={styles.card}
            imageStyle={styles.cardBackground}
          >
            <View style={styles.cardOverlay}>
              <View style={styles.textBlock}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: item.btnColor }]}
                  onPress={() => {/*test*/}}
                >
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
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
    minHeight: 180,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  cardBackground: {
    resizeMode: 'cover',
  },
  cardOverlay: {
    padding: 20,
    justifyContent: 'space-between',
    minHeight: 180,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 22,
    color: '#1A1A1A',
    marginBottom: 6,
  },
  cardDesc: {
    width: '70%',
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 16,
    lineHeight: 20,
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