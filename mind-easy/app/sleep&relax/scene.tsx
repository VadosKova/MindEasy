import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BackIcon } from '@/components/icons/BackIcon';

import RainScene from '@/app/sleep&relax/scenes/RainScene';
import OceanScene from '@/app/sleep&relax/scenes/OceanScene';
import FireScene from '@/app/sleep&relax/scenes/FireScene';
import NightScene from '@/app/sleep&relax/scenes/NightScene';


export default function SceneScreen() {
  const router = useRouter();
  const { scene, duration } = useLocalSearchParams<{
    scene: string;
    duration: string;
  }>();

  const [secondsLeft, setSecondsLeft] = useState(Number(duration) * 60);

  const sceneColors: Record<string, string[]> = {
    rain: ['#4B79A1', '#283E51'],
    ocean: ['#2E8BC0', '#145DA0'],
    fireplace: ['#FF512F', '#d5ae00'],
    night: ['#0F2027', '#2C5364'],
  };

  const colors = sceneColors[scene ?? 'night'];

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
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