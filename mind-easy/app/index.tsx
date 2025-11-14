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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const carouselImages = [
  { uri: 'https://images.freeimages.com/images/large-previews/9b0/sunset-1344107.jpg' },
  { uri: 'https://th.bing.com/th/id/R.ab48afc6bf0eefb07e7dd1e30f6dcba8?rik=CAZjNPpZe%2bV0wg&pid=ImgRaw&r=0' },
  { uri: 'https://img.freepik.com/premium-photo/4k-desktop-wallpaper-hills-river-nature_485374-11875.jpg?w=740' },
];

export default function OnBoardingScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const scrollToNext = () => {
    const nextIndex = (currentIndexRef.current + 1) % carouselImages.length;
    scrollViewRef.current?.scrollTo({
      x: nextIndex * SCREEN_WIDTH,
      animated: true,
    });
    setCurrentIndex(nextIndex);
    currentIndexRef.current = nextIndex;
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current as number);
    }
    autoScrollIntervalRef.current = setInterval(() => {
      scrollToNext();
    }, 3000);
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current as number);
      }
    };
  }, []);

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