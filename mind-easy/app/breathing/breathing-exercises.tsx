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

  useEffect(() => {
    if (!running) {
      setSecondsLeft(durationMin * 60);
    }
  }, [durationMin, running]);

  useEffect(() => {
    player.loop = true;
    player.volume = 0.35;
  }, [player]);

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

  useEffect(() => {
    if (!running) return;

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

      if (phaseTimeRef.current <= 1) {
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
      color: '#AEC1DE',
    },
    {
      key: '478' as const,
      title: t.fourSevenEight,
      desc: 'Calm anxiety',
      color: '#7CBF98',
    },
    {
      key: 'deep' as const,
      title: t.deepCalm,
      desc: 'Slow breathing',
      color: '#CCAEDE',
    },
    {
      key: 'energizing' as const,
      title: t.energizingBreathing,
      desc: 'Increase concentration',
      color: '#BBC754',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
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
              { borderColor: item.color, backgroundColor: '#FBFAF2' },
              selectedExercise === item.key && { backgroundColor: '#FFFFFF' },
            ]}
            onPress={() => !running && setSelectedExercise(item.key)}
          >
            <Text style={[styles.exerciseTitle, { color: '#263238' }]}>{item.title}</Text>
            <Text style={styles.exerciseDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controlsCard}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.controlLabel}>{t.speed}</Text>
            <View style={styles.segmentContainer}>
              {(['slow', 'normal'] as const).map(v => (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.segmentButton,
                    speed === v && styles.segmentButtonActive,
                  ]}
                  onPress={() => !running && setSpeed(v)}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      speed === v && styles.segmentButtonTextActive,
                    ]}
                  >
                    {t[v]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.controlLabel}>{t.sound}</Text>
            <View style={styles.segmentContainer}>
              {(['waves', 'rain', 'silence'] as const).map(v => (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.segmentButton,
                    sound === v && styles.segmentButtonActive,
                  ]}
                  onPress={() => !running && setSound(v)}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      sound === v && styles.segmentButtonTextActive,
                    ]}
                  >
                    {t[v]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.controlLabel}>{t.vibration}</Text>
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                vibration && styles.segmentButtonActive,
              ]}
              onPress={() => !running && setVibration(true)}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  vibration && styles.segmentButtonTextActive,
                ]}
              >
                {t.on}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                !vibration && styles.segmentButtonActive,
              ]}
              onPress={() => !running && setVibration(false)}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  !vibration && styles.segmentButtonTextActive,
                ]}
              >
                {t.off}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButtonWrapper, { marginTop: 8 }]}
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
      </View>

      {running && (
        <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
      )}
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
  circleContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 230,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImg: {
    resizeMode: 'contain',
  },
  phase: {
    fontSize: 20,
    fontFamily: 'Jua_400Regular',
    color: '#000000',
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
    height: 60,
    backgroundColor: '#FBFAF2',
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#DDD',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseCardSelected: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseTitle: {
    fontSize: 16,
    fontFamily: 'Jua_400Regular',
    color: '#263238',
    textAlign: 'center',
  },
  exerciseDesc: {
    marginTop: 6,
    fontSize: 12,
    color: '#37474F',
    fontFamily: 'IstokWeb_400Regular',
    textAlign: 'center',
  },
  controlsCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  controlLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 6,
    fontFamily: 'Jua_400Regular',
  },
  row: {
    flexDirection: 'row',
    gap: 22,
    marginBottom: 12,
  },
  circleOption: {
    width: 63,
    height: 30,
    borderRadius: 13,
    backgroundColor: '#E6E6E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOptionSelected: {
    backgroundColor: '#F2EFB0',
    fontSize: 18,
    fontFamily: 'Jua_400Regular',
  },
  circleOptionText: {
    fontSize: 18,
    fontFamily: 'Jua_400Regular',
    color: '#37474F',
  },
  circleOptionTextSelected: {
    fontSize: 18,
    color: '#37474F',
    fontFamily: 'Jua_400Regular',
  },
  rectOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#8CCAED',
  },
  rectOptionSelected: {
    backgroundColor: '#F2EFB0',
    fontFamily: 'IstokWeb_400Regular',
  },
  rectOptionText: {
    fontSize: 14,
    fontFamily: 'IstokWeb_400Regular',
    color: '#ffffff',
  },
  rectOptionTextSelected: {
    fontSize: 14,
    color: '#37474F',
    fontWeight: '600',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#8CCAED',
    borderRadius: 15,
    gap: 4,
    height: 30,
  },
  segmentButton: {
    flex: 1,
    height: 30,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  segmentButtonActive: {
    backgroundColor: '#FDE68A',
  },
  segmentButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'IstokWeb_400Regular',
    flexShrink: 1,
  },
  segmentButtonTextActive: {
    color: '#263238',
    fontFamily: 'IstokWeb_700Bold',
  },
  timer: {
    marginTop: 12,
    fontSize: 20,
    color: '#607D8B',
  },
  startButtonWrapper: {
    width: '100%',
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
