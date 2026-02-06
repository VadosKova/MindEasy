import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { BackIcon } from '@/components/icons/BackIcon';

const TOTAL_TIME = 300;
const PHASE_TIME = 4;

const circleImg = require('@/assets/images/Ellipse 23.png');
const soundFile = require('@/assets/sounds/relax.mp3');

export default function CalmBreathing() {
  const router = useRouter();

  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [phase, setPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef(0);

  const soundRef = useRef<Audio.Sound | null>(null);

  const scale = useRef(new Animated.Value(1)).current;
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;

  const startSound = async () => {
    if (soundRef.current) return;

    const { sound } = await Audio.Sound.createAsync(soundFile, {
      isLooping: true,
      volume: 0.35,
    });

    soundRef.current = sound;
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync();
    await soundRef.current.unloadAsync();
    soundRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  useEffect(() => {
    if (!running) return;

    Animated.timing(scale, {
      toValue: phase === 'Inhale' ? 1.15 : 0.9,
      duration: PHASE_TIME * 1000,
      useNativeDriver: true,
    }).start();
  }, [phase, running]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return TOTAL_TIME;
        }
        return prev - 1;
      });

      phaseRef.current += 1;
      if (phaseRef.current >= PHASE_TIME) {
        phaseRef.current = 0;
        setPhase(p => (p === 'Inhale' ? 'Exhale' : 'Inhale'));
      }

    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const format = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation</Text>
      </View>

      <Text style={styles.title}>Calm breathing</Text>
      <Text style={styles.subtitle}>Breathe slowly and relax</Text>

      <Animated.View style={{ transform: [{ scale }], marginTop: 40 }}>
        <ImageBackground source={circleImg} style={styles.circle} imageStyle={styles.circleImg}>
          <Text style={styles.phase}>{phase}</Text>
        </ImageBackground>
      </Animated.View>

      <Text style={styles.timer}>
        {format(TOTAL_TIME - secondsLeft)} / 05:00
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.start} onPress={() => setRunning(true)}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stop} onPress={() => setRunning(false)}>
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    paddingTop: 20,
  },

  header: {
    width: '100%',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    marginLeft: 12,
    color: '#37474F',
  },

  title: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
    color: '#37474F',
  },

  subtitle: {
    marginTop: 6,
    color: '#78909C',
    fontSize: 18,
  },

  circle: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleImg: {
    resizeMode: 'contain',
  },

  phase: {
    fontSize: 28,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
  },

  timer: {
    marginTop: 40,
    fontSize: 20,
    color: '#607D8B',
  },

  buttons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 40,
  },

  start: {
    backgroundColor: '#BEE8C8',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },

  stop: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },

  startText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#1D3D30',
  },

  stopText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#263238',
  },
});