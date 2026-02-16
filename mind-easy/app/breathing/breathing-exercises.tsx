import { useEffect, useRef, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  Switch,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';

import { BackIcon } from '@/components/icons/BackIcon';
import { useAppSettings } from '@/context/AppSettingsContext';
import { translations } from '@/constants/i18n';

const circleImg = require('@/assets/images/Ellipse 31.png');
const soundFile = require('@/assets/sounds/relax.mp3');

export type BreathPhase = { type: 'inhale' | 'hold' | 'exhale'; duration: number };

const BOX: BreathPhase[] = [
  { type: 'inhale', duration: 4 },
  { type: 'hold', duration: 4 },
  { type: 'exhale', duration: 4 },
  { type: 'hold', duration: 4 },
];

const FOUR_SEVEN_EIGHT: BreathPhase[] = [
  { type: 'inhale', duration: 4 },
  { type: 'hold', duration: 7 },
  { type: 'exhale', duration: 8 },
];

const DEEP_CALM: BreathPhase[] = [
  { type: 'inhale', duration: 5 },
  { type: 'exhale', duration: 5 },
];

const ENERGIZING: BreathPhase[] = [
  { type: 'inhale', duration: 3 },
  { type: 'exhale', duration: 3 },
];

export default function BreathingExercises() {
  const router = useRouter();
  const { language } = useAppSettings();
  const t = translations[language];

  const [selectedExercise, setSelectedExercise] = useState<'box' | '478' | 'deep' | 'energizing'>('box');
  const [durationMin, setDurationMin] = useState(5);
  const [speed, setSpeed] = useState<'slow' | 'normal'>('normal');
  const [sound, setSound] = useState<'waves' | 'rain' | 'silence'>('waves');
  const [vibration, setVibration] = useState(false);

  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durationMin * 60);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'ready'>('ready');
  // refs for tracking current phase and remaining time
  const phaseIndexRef = useRef(0);
  const phaseTimeRef = useRef(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const player = useAudioPlayer(soundFile);
  const scale = useRef(new Animated.Value(1)).current;

  const pattern = useMemo(() => {
    switch (selectedExercise) {
      case 'box':
        return BOX;
      case '478':
        return FOUR_SEVEN_EIGHT;
      case 'deep':
        return DEEP_CALM;
      case 'energizing':
        return ENERGIZING;
    }
  }, [selectedExercise]);

  const speedMultiplier = speed === 'slow' ? 1.5 : 1;

  // make sure secondsLeft updates when durationMin changes and not running
  useEffect(() => {
    if (!running) {
      setSecondsLeft(durationMin * 60);
    }
  }, [durationMin, running]);

  useEffect(() => {
    player.loop = true;
    player.volume = 0.35;
  }, [player]);

  // animate circle when phase changes
  useEffect(() => {
    if (!running) return;
    const idx = phaseIndexRef.current;
    const currentPhase = pattern[idx];
    Animated.timing(scale, {
      toValue:
        currentPhase.type === 'inhale'
          ? 1.15
          : currentPhase.type === 'exhale'
          ? 0.9
          : 1,
      duration: currentPhase.duration * 1000 * speedMultiplier,
      useNativeDriver: true,
    }).start();
  }, [phase, running, pattern, speedMultiplier]);

  // main timer
  useEffect(() => {
    if (!running) return;

    // initialise refs on start
    phaseIndexRef.current = 0;
    phaseTimeRef.current = Math.ceil(pattern[0].duration * speedMultiplier);
    setPhase(pattern[0].type);

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          player.pause();
          setPhase('ready');
          return durationMin * 60;
        }
        return prev - 1;
      });

      // phase timing
      if (phaseTimeRef.current <= 1) {
        // advance to next
        phaseIndexRef.current =
          (phaseIndexRef.current + 1) % pattern.length;
        const nextPhase = pattern[phaseIndexRef.current];
        phaseTimeRef.current = Math.ceil(
          nextPhase.duration * speedMultiplier
        );
        setPhase(nextPhase.type);
        if (vibration) {
          Vibration.vibrate(100);
        }
      } else {
        phaseTimeRef.current -= 1;
      }
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [running, pattern, speedMultiplier, durationMin, vibration, player]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleStartPause = async () => {
    if (running) {
      setRunning(false);
      player.pause();
    } else {
      setRunning(true);
      // refs will be initialized in effect
      if (sound !== 'silence') {
        player.play();
      }
    }
  };

  const exerciseItems = [
    {
      key: 'box' as const,
      title: t.boxBreathing,
      desc: 'Calm stress & anxiety',
    },
    {
      key: '478' as const,
      title: t.fourSevenEight,
      desc: 'Calm anxiety',
    },
    {
      key: 'deep' as const,
      title: t.deepCalm,
      desc: 'Slow breathing',
    },
    {
      key: 'energizing' as const,
      title: t.energizingBreathing,
      desc: 'Increases concentration',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>{t.breathingExercises}</Text>
      </View>

      <View style={styles.circleContainer}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <ImageBackground
            source={circleImg}
            style={styles.circle}
            imageStyle={styles.circleImg}
          >
            <Text style={styles.phase}>
              {phase === 'ready'
                ? t.readyToBreathe
                : phase === 'inhale'
                ? t.inhale
                : phase === 'exhale'
                ? t.exhale
                : phase === 'hold'
                ? t.hold
                : ''}
            </Text>
          </ImageBackground>
        </Animated.View>
      </View>

      <View style={styles.optionsGrid}>
        {exerciseItems.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.exerciseCard,
              selectedExercise === item.key && styles.exerciseCardSelected,
            ]}
            onPress={() => !running && setSelectedExercise(item.key)}
          >
            <Text style={styles.exerciseTitle}>{item.title}</Text>
            <Text style={styles.exerciseDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controlsCard}>
        {/* duration */}
        <Text style={styles.controlLabel}>{t.duration}</Text>
        <View style={styles.row}>            
          {[3, 5, 7, 10].map(n => (
            <TouchableOpacity
              key={n}
              style={[
                styles.circleOption,
                durationMin === n && styles.circleOptionSelected,
              ]}
              onPress={() => !running && setDurationMin(n)}
            >
              <Text
                style={
                  durationMin === n
                    ? styles.circleOptionTextSelected
                    : styles.circleOptionText
                }
              >
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* speed */}
        <Text style={styles.controlLabel}>{t.speed}</Text>
        <View style={styles.row}>            
          {(['slow', 'normal'] as const).map(v => (
            <TouchableOpacity
              key={v}
              style={[
                styles.rectOption,
                speed === v && styles.rectOptionSelected,
              ]}
              onPress={() => !running && setSpeed(v)}
            >
              <Text
                style={
                  speed === v
                    ? styles.rectOptionTextSelected
                    : styles.rectOptionText
                }
              >
                {t[v]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* sound */}
        <Text style={styles.controlLabel}>{t.sound}</Text>
        <View style={styles.row}>            
          {(['waves', 'rain', 'silence'] as const).map(v => (
            <TouchableOpacity
              key={v}
              style={[
                styles.rectOption,
                sound === v && styles.rectOptionSelected,
              ]}
              onPress={() => !running && setSound(v)}
            >
              <Text
                style={
                  sound === v
                    ? styles.rectOptionTextSelected
                    : styles.rectOptionText
                }
              >
                {t[v]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* vibration */}
        <View style={[styles.row, { justifyContent: 'space-between' }]}>            
          <Text style={styles.controlLabel}>{t.vibration}</Text>
          <Switch
            value={vibration}
            onValueChange={setVibration}
            trackColor={{ false: '#ccc', true: '#2DB200' }}
            thumbColor={'#FFFFFF'}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>
      </View>

      {/* timer text */}
      {running && (
        <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
      )}

      <TouchableOpacity
        style={styles.startButtonWrapper}
        onPress={handleStartPause}
      >
        <LinearGradient
          colors={['#8CCAED', '#80CBC5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>
            {running ? t.pause : t.startSession}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  title: {
    marginLeft: 12,
    fontSize: 24,
    fontFamily: 'Jua_400Regular',
    color: '#37474F',
  },
  circleContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 20,
  },
  exerciseCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
  },
  exerciseCardSelected: {
    borderColor: '#8CCAED',
  },
  exerciseTitle: {
    fontSize: 16,
    fontFamily: 'Jua_400Regular',
    color: '#37474F',
  },
  exerciseDesc: {
    marginTop: 4,
    fontSize: 12,
    color: '#78909C',
  },
  controlsCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  controlLabel: {
    fontSize: 16,
    color: '#37474F',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  circleOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOptionSelected: {
    backgroundColor: '#FDE68A',
  },
  circleOptionText: {
    fontSize: 16,
    color: '#37474F',
  },
  circleOptionTextSelected: {
    fontSize: 16,
    color: '#37474F',
    fontWeight: '600',
  },
  rectOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  rectOptionSelected: {
    backgroundColor: '#FDE68A',
  },
  rectOptionText: {
    fontSize: 14,
    color: '#37474F',
  },
  rectOptionTextSelected: {
    fontSize: 14,
    color: '#37474F',
    fontWeight: '600',
  },
  timer: {
    marginTop: 12,
    fontSize: 20,
    color: '#607D8B',
  },
  startButtonWrapper: {
    width: '90%',
    marginTop: 20,
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
