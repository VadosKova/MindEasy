import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { BackIcon } from '@/components/icons/BackIcon';
import SleepIcon from '@/components/icons/SleepIcon';
import MindIcon from '@/components/icons/MindIcon';
import RelaxIcon from '@/components/icons/RelaxIcon';
import NightIcon from '@/components/icons/NightIcon';

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
  icon: React.ComponentType<any>;
}> = [
  { key: 'sleep', title: 'Fall asleep', icon: SleepIcon },
  { key: 'quiet', title: 'Quit mind', icon: MindIcon },
  { key: 'deep', title: 'Deep relax', icon: RelaxIcon },
  { key: 'wake', title: 'Night\nwake-up', icon: NightIcon },
];

export default function SleepRelax() {
  const router = useRouter();

  const [selectedNeed, setSelectedNeed] = useState<NeedType>('sleep');
  const [selectedScene, setSelectedScene] = useState<SceneType>('rain');
  const [selectedDuration, setSelectedDuration] = useState(5);

  const handleStartSession = () => {
    router.push('/calm-breathing');
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
          {needOptions.map(option => {
            const NeedIcon = option.icon;

            return (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.needCard,
                  selectedNeed === option.key && styles.needCardSelected,
                ]}
                onPress={() => setSelectedNeed(option.key)}
              >
                <NeedIcon width={38} height={38} />
                <Text style={styles.needText}>{option.title}</Text>
              </TouchableOpacity>
            );
          })}
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
    width: 34,
    height: 34,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
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
    backgroundColor: '#F1F0E6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  needText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: '#111111',
    fontFamily: 'Jua_400Regular',
  },
  sectionTitle: {
    fontSize: 34,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
    marginBottom: 12,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 14,
  },
  sceneCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  sceneImage: {
    width: '100%',
    aspectRatio: 1.25,
  },
  sceneLabelWrap: {
    backgroundColor: '#F1F0E6',
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
  },
  controlsCard: {
    backgroundColor: '#F4F3EA',
    borderRadius: 12,
    padding: 10,
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
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Jua_400Regular',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#D7D8D0',
    borderRadius: 16,
    gap: 4,
    padding: 3,
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
    backgroundColor: '#E9E496',
  },
  durationButtonText: {
    fontSize: 16,
    color: '#34424B',
    fontFamily: 'Jua_400Regular',
  },
  durationButtonTextActive: {
    color: '#314049',
  },
  startButtonWrapper: {
    marginTop: 2,
  },
  startButton: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#F3F7F7',
    fontFamily: 'Jua_400Regular',
  },
});
