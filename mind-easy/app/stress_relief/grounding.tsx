import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

const steps = [
  {
    id: 1,
    instruction: 'Find 5 things you can see',
    color: '#E8F5E9',
    textColor: '#5D865F',
  },
  {
    id: 2,
    instruction: 'Find 4 sounds you can hear',
    color: '#F1F8E9',
    textColor: '#7CB342',
  },
  {
    id: 3,
    instruction: 'Find 3 things you can touch',
    color: '#F3E5F5',
    textColor: '#8C75B3',
  },
  {
    id: 4,
    instruction: 'Find 2 smells you can notice',
    color: '#FCE4EC',
    textColor: '#C2185B',
  },
  {
    id: 5,
    instruction: 'Find 1 taste you can identify',
    color: '#FFF3E0',
    textColor: '#E4A63F',
  },
];

export default function GroundingScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];
  const [currentStep, setCurrentStep] = useState(0);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
      setCurrentStep(currentStep + 1);
    } else {
      router.back();
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Grounding 5-4-3-2-1</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: step.textColor },
            ]}
          />
        </View>

        <Text style={[styles.stepCounter, { color: step.textColor }]}>
          Step {currentStep + 1} of {steps.length}
        </Text>

        <Animated.View
          style={[
            styles.instructionCard,
            { backgroundColor: step.color, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={[styles.stepNumber, { color: step.textColor }]}>
            {step.id}
          </Text>
          <Text style={[styles.instruction, { color: step.textColor }]}>
            {step.instruction}
          </Text>
        </Animated.View>

        <Text style={[styles.description, { color: colors.text }]}>
          Take your time. Notice what you find. When you're ready, press Next.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: step.textColor }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  stepCounter: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  instructionCard: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  stepNumber: {
    fontFamily: 'Jua_400Regular',
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instruction: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  nextButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
