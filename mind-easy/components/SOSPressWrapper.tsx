import { useRef, useEffect } from 'react';
import {
  Pressable,
  Animated,
  Easing,
  Alert,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface SOSPressWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const SOSPressWrapper = ({ children, enabled = true }: SOSPressWrapperProps) => {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hapticIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!enabled) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    let step = 0;
    hapticIntervalRef.current = setInterval(() => {
      step++;
      if (step < 5) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (step < 10) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }, 200);

    timerRef.current = setTimeout(() => {
      cleanup();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/sos');
    }, 3000);
  };

  const handlePressOut = () => {
    cleanup();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const cleanup = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Pressable
      onLongPress={handlePressIn}
      onPressOut={handlePressOut}
      delayLongPress={300}
      style={{ flex: 1 }}
    >
      <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
