import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { BackIcon } from '@/components/icons/BackIcon';
import SleepIcon from '@/components/icons/SleepIcon';
import MindIcon from '@/components/icons/MindIcon';
import RelaxIcon from '@/components/icons/RelaxIcon';
import NightIcon from '@/components/icons/NightIcon';
import { useAppSettings } from '@/context/AppSettingsContext';
import { translations } from '@/constants/i18n';

type SceneType = 'rain' | 'ocean' | 'fireplace' | 'night';

const sceneData: Array<{
  key: SceneType;
  title: string;
  image: any;
  icon: React.ComponentType<any>;
}> = [
  {
    key: 'rain',
    title: 'Rain by Window',
    image: require('@/assets/images/rain-by-window.png'),
    icon: SleepIcon,
  },
  {
    key: 'ocean',
    title: 'Ocean Sounds',
    image: require('@/assets/images/ocean.png'),
    icon: MindIcon,
  },
  {
    key: 'fireplace',
    title: 'Fireplace',
    image: require('@/assets/images/fireplace.png'),
    icon: RelaxIcon,
  },
  {
    key: 'night',
    title: 'Night Sky',
    image: require('@/assets/images/night.png'),
    icon: NightIcon,
  },
];

const durations = [5, 10, 15, 20, 30];

export default function SleepRelax() {
  const router = useRouter();
  const { language } = useAppSettings();
  const t = translations[language];

  const [selectedScene, setSelectedScene] = useState<SceneType>('rain');
  const [selectedDuration, setSelectedDuration] = useState(10);

  const handleStartSession = () => {
    // TODO: Navigate to meditation player
  };

  const currentScene = sceneData.find(s => s.key === selectedScene);
  const SceneIcon = currentScene?.icon;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Sleep & Relaxation</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scene Selection */}
        <Text style={styles.sectionTitle}>Choose Your Scene</Text>
        <View style={styles.scenesGrid}>
          {sceneData.map(scene => (
            <TouchableOpacity
              key={scene.key}
              style={[
                styles.sceneCard,
                selectedScene === scene.key && styles.sceneCardSelected,
              ]}
              onPress={() => setSelectedScene(scene.key)}
            >
              <ImageBackground
                source={scene.image}
                style={styles.sceneImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.sceneOverlay}>
                  <View style={styles.sceneIconContainer}>
                    {SceneIcon && <SceneIcon width={40} height={40} />}
                  </View>
                  <Text style={styles.sceneTitle}>{scene.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        {/* Duration Selection */}
        <View style={styles.controlsCard}>
          <Text style={styles.controlLabel}>Duration (minutes)</Text>
          <View style={styles.segmentContainer}>
            {durations.map(duration => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  selectedDuration === duration && styles.durationButtonActive,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    selectedDuration === duration &&
                      styles.durationButtonTextActive,
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButtonWrapper}
          onPress={handleStartSession}
        >
          <LinearGradient
            colors={['#8CCAED', '#80CBC5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start Session</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
    marginBottom: 12,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  sceneCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  sceneCardSelected: {
    borderColor: '#80CBC5',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  sceneImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sceneOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingBottom: 12,
    paddingTop: 12,
    alignItems: 'center',
  },
  sceneIconContainer: {
    marginBottom: 8,
  },
  sceneTitle: {
    fontSize: 14,
    fontFamily: 'IstokWeb_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  controlsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  controlLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Jua_400Regular',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#8CCAED',
    borderRadius: 12,
    gap: 2,
    padding: 3,
  },
  durationButton: {
    flex: 1,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  durationButtonActive: {
    backgroundColor: '#FDE68A',
  },
  durationButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'IstokWeb_400Regular',
  },
  durationButtonTextActive: {
    color: '#263238',
    fontFamily: 'IstokWeb_700Bold',
  },
  startButtonWrapper: {
    marginBottom: 20,
  },
  startButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Jua_400Regular',
  },
});
