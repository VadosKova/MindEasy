import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

const { width } = Dimensions.get('window');

export default function ShakeItOffScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isRunning, shakeAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const shakeInterpolate = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-10, 0, 10],
  });

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(30);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Shake it off</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.figureContainer,
            { transform: [{ translateX: shakeInterpolate }] },
          ]}
        >
          <Text style={styles.figure}>🧑</Text>
        </Animated.View>

        <Text style={[styles.instruction, { color: colors.text }]}>
          Shake your arms and legs energetically for 30 seconds!
        </Text>
        <Text style={[styles.subInstruction, { color: colors.text }]}>
          Release the built-up tension and adrenaline from your body.
        </Text>

        <Animated.View
          style={[
            styles.timerCircle,
            { backgroundColor: '#E4A63F', transform: [{ scale: pulseAnim }] },
          ]}
        >
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isRunning ? '#FF6B6B' : '#E4A63F',
              },
            ]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>
              {isRunning ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${((30 - timeLeft) / 30) * 100}%`,
                backgroundColor: '#E4A63F',
              },
            ]}
          />
        </View>

        {timeLeft === 30 && !isRunning && (
          <Text style={[styles.message, { color: colors.text }]}>
            Ready to shake off the stress?
          </Text>
        )}
        {timeLeft < 5 && timeLeft > 0 && isRunning && (
          <Text style={styles.finalMessage}>
            Almost there! Keep going! 💪
          </Text>
        )}
        {timeLeft === 30 && !isRunning && timeLeft !== 30 && (
          <Text style={styles.completeMessage}>
            Great job! You did it! ✓
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
    marginTop: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  figureContainer: {
    marginBottom: 30,
  },
  figure: {
    fontSize: 120,
  },
  instruction: {
    fontFamily: 'Jua_400Regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  subInstruction: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
    opacity: 0.7,
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  timerText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 64,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  message: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  finalMessage: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  completeMessage: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#5D865F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
