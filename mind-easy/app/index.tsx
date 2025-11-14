import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Logo } from '@/components/Logo';
import { GradientText } from '@/components/GradientText';
import { SmileyIcon } from '@/components/icons/SmileyIcon';
import { HeadphonesIcon } from '@/components/icons/HeadphonesIcon';
import { JournalIcon } from '@/components/icons/JournalIcon';

export default function OnBoardingScreen() {
  

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
});