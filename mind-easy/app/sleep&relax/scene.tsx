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