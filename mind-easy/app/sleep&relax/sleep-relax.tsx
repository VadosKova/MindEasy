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
import SleepImg from '@/assets/images/sleep.png';
import MindImg from '@/assets/images/mind.png';
import RelaxImg from '@/assets/images/relax.png';
import NightImg from '@/assets/images/nightIcon.png';

type SceneType = 'rain' | 'ocean' | 'fireplace' | 'night';
type NeedType = 'sleep' | 'quiet' | 'deep' | 'wake';

const sceneData: Array<{
  key: SceneType;
  title: string;
  image: any;
}> = [
  {
    key: 'rain',
    title: 'Rain by the window',
    image: require('@/assets/images/rain-by-window.png'),
  },
  {
    key: 'ocean',
    title: 'Ocean waves',
    image: require('@/assets/images/ocean.png'),
  },
  {
    key: 'fireplace',
    title: 'Fireplace',
    image: require('@/assets/images/fireplace.png'),
  },
  {
    key: 'night',
    title: 'Night sky',
    image: require('@/assets/images/night.png'),
  },
];

const durations = [5, 10, 15, 20, 25];
const needOptions: Array<{
  key: NeedType;
  title: string;
  image: any;
}> = [
  { key: 'sleep', title: 'Fall asleep', image: SleepImg },
  { key: 'quiet', title: 'Quit mind', image: MindImg },
  { key: 'deep', title: 'Deep relax', image: RelaxImg },
  { key: 'wake', title: 'Night\nwake-up', image: NightImg },
];

export default function SleepRelax() {
  const router = useRouter();

  const [selectedNeed, setSelectedNeed] = useState<NeedType>('sleep');
  const [selectedScene, setSelectedScene] = useState<SceneType>('rain');
  const [selectedDuration, setSelectedDuration] = useState(5);

  const handleStartSession = () => {
    router.push({
      pathname: '/sleep-relax/scene',
      params: {
        scene: selectedScene,
        need: selectedNeed,
        duration: selectedDuration,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What do you need{'\n'}right now?</Text>

        <View style={styles.needsGrid}>
          {needOptions.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.needCard,
                selectedNeed === option.key && styles.needCardSelected,
              ]}
              onPress={() => setSelectedNeed(option.key)}
            >
              <Image
                source={option.image}
                style={styles.needImage}
                resizeMode="contain"
              />
              <Text style={styles.needText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Relaxing scenes</Text>
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
              />
              <View style={styles.sceneLabelWrap}>
                <Text style={styles.sceneTitle}>{scene.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controlsCard}>
          <View style={styles.durationRow}>
            <Text style={styles.controlLabel}>Duration</Text>
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

          <TouchableOpacity
            style={styles.startButtonWrapper}
            onPress={handleStartSession}
          >
            <LinearGradient
              colors={['#8CCAED', '#6DC6BE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Start session</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6CF',
  },
  header: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 4,
    backgroundColor: '#E6E6CF',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Jua_400Regular',
    color: '#37474F',
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 6,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  needsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 20,
  },
  needCard: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#F3F2E2',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  needCardSelected: {
    borderWidth: 2,
    borderColor: '#D6D4BF',
  },
  needImage: {
    width: 50,
    height: 50,
  },
  needText: {
    width: '100%',
    flex: 1,
    fontSize: 18,
    lineHeight: 20,
    color: '#111111',
    fontFamily: 'Jua_400Regular',
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: 'Jua_400Regular',
    color: '#37474F',
    marginBottom: 12,
    marginTop: 9,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 14,
    marginTop: 4,
  },
  sceneCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  sceneImage: {
    width: 171,
    height: 101,
  },
  sceneLabelWrap: {
    width: '100%',
    height: 30,
    backgroundColor: '#F4F2E6',
    paddingVertical: 8,
    borderRadius: 11,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sceneCardSelected: {
    borderColor: '#80CBC5',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sceneTitle: {
    fontSize: 15,
    fontFamily: 'Jua_400Regular',
    color: '#111111',
    textAlign: 'center',
    position: 'absolute',
    bottom: 6,
    width: '100%',
  },
  controlsCard: {
    backgroundColor: '#F4F3EA',
    borderRadius: 12,
    padding: 18,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  controlLabel: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Jua_400Regular',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#D7D8D0',
    borderRadius: 16,
    gap: 4,
    flex: 1,
  },
  durationButton: {
    flex: 1,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButtonActive: {
    width: '100%',
    backgroundColor: '#F2EFB0',
  },
  durationButtonText: {
    fontSize: 18,
    color: '#37474F',
    fontFamily: 'Jua_400Regular',
  },
  durationButtonTextActive: {
    color: '#37474F',
  },
  startButtonWrapper: {
    marginTop: 2,
  },
  startButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    fontSize: 18,
    color: '#F3F7F7',
    fontFamily: 'Jua_400Regular',
  },
});
