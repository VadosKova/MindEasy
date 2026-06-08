import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';
import { BackIcon } from '@/components/icons/BackIcon';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';

const bodyScanAudio = require('@/assets/sounds/rain.mp3');

const bodyParts = [
  'Toes and feet',
  'Ankles and calves',
  'Knees and thighs',
  'Hip and lower back',
  'Abdomen and lower chest',
  'Heart and upper chest',
  'Shoulders and arms',
  'Neck and throat',
  'Face and head',
];

export default function BodyScanScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];
  const [currentPart, setCurrentPart] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const player = useAudioPlayer(bodyScanAudio);

  useEffect(() => {
    player.loop = true;
    player.volume = 0.5;
    return () => {
      if (player.playing) {
        player.pause();
      }
    };
  }, [player]);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [currentPart, scaleAnim]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Body Scan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.bodyPartCard,
            { backgroundColor: '#F3E5F5', transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={[styles.bodyPartText, { color: '#8C75B3' }]}>
            {bodyParts[currentPart]}
          </Text>
        </Animated.View>

        <Text style={[styles.description, { color: colors.text }]}>
          Focus on {bodyParts[currentPart].toLowerCase()}. Notice any tension or relaxation.
          Let it relax.
        </Text>

        <View style={styles.playerSection}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
          >
            <Text style={styles.playIcon}>
              {player.playing ? '⏸' : '▶'}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.playerLabel, { color: colors.text }]}>
            {player.playing ? 'Playing...' : 'Tap to listen'}
          </Text>
        </View>

        <View style={styles.dotsContainer}>
          {bodyParts.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                index === currentPart && styles.activeDot,
                { backgroundColor: index === currentPart ? '#8C75B3' : '#E0E0E0' },
              ]}
              onPress={() => setCurrentPart(index)}
            />
          ))}
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, !currentPart && styles.disabledButton]}
            onPress={() => currentPart > 0 && setCurrentPart(currentPart - 1)}
            disabled={currentPart === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, currentPart === bodyParts.length - 1 && styles.completeButton]}
            onPress={() => {
              if (currentPart < bodyParts.length - 1) {
                setCurrentPart(currentPart + 1);
              } else {
                player.pause();
                router.back();
              }
            }}
          >
            <Text style={styles.navButtonText}>
              {currentPart === bodyParts.length - 1 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  bodyPartCard: {
    paddingVertical: 50,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  bodyPartText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  playerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8C75B3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  playIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    left: 2,
    top: -1,
  },
  playerLabel: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8C75B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D0D0D0',
  },
  completeButton: {
    backgroundColor: '#5D865F',
  },
  navButtonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
