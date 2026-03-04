import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { BackIcon } from '@/components/icons/BackIcon';

import RainScene from '@/app/sleep&relax/scenes/RainScene';
import OceanScene from '@/app/sleep&relax/scenes/OceanScene';
import FireScene from '@/app/sleep&relax/scenes/FireScene';
import NightScene from '@/app/sleep&relax/scenes/NightScene';

const soundMap: Record<string, any> = {
  rain: require('@/assets/sounds/rain.mp3'),
  ocean: require('@/assets/sounds/ocean.mp3'),
  fireplace: require('@/assets/sounds/fire.mp3'),
  night: require('@/assets/sounds/night.mp3'),
};

export default function SceneScreen() {
  const router = useRouter();
  const { scene, duration } = useLocalSearchParams<{
    scene: string;
    duration: string;
  }>();

  const [secondsLeft, setSecondsLeft] = useState(Number(duration) * 60);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        soundMap[scene ?? 'rain'],
        { isLooping: true, volume: 0.8 }
      );
      if (mounted) {
        setSound(sound);
        await sound.playAsync();
      }
    };

    loadSound();

    return () => {
      mounted = false;
      sound?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      sound?.stopAsync();
      return;
    }

    const t = setInterval(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Selected scene</Text>
      </View>

      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={StyleSheet.absoluteFill}
      />

      {/* {scene === 'rain' && <RainScene />}
      {scene === 'ocean' && <OceanScene />}
      {scene === 'fireplace' && <FireScene />}
      {scene === 'night' && <NightScene />} */}

      <View style={styles.overlay}>
        <Text style={styles.text}>Close your eyes{'\n'}and just relax</Text>
        <View style={styles.timer}>
          <Text style={styles.timerText}>
            {minutes}:{seconds}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 6,
    zIndex: 10,
  },

  headerText: {
    fontSize: 28,
    fontFamily: 'Jua_400Regular',
    color: '#EAF6F6',
    marginLeft: 12,
  },

  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },

  sceneWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  overlay: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
    zIndex: 5,
  },

  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'IstokWeb_400Regular',
    marginBottom: 20,
    opacity: 0.9,
  },

  timer: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },

  timerText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Jua_400Regular',
    letterSpacing: 1,
  },
});