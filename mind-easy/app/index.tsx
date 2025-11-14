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

  const handleScrollBeginDrag = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current as number);
    }
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  const handleGetStarted = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.mainScroll}>

        <View style={styles.logoSection}>
          <Logo size={120} />
          <View style={styles.titleContainer}>
            <GradientText colors={['#8CCAED', '#80CBC5']} style={styles.appName}>
              MindEasy
            </GradientText>
          </View>
          <Text style={styles.description}>
            Your daily companion for mental health and mindfulness
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#FFC01E' }]}>
              <SmileyIcon size={33} color="#37474F" />
            </View>
            <Text style={styles.featureText}>Mood tracking</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#81D4FA' }]}>
              <HeadphonesIcon size={38} color="#37474F" />
            </View>
            <Text style={styles.featureText}>Meditations</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#A5D6A7' }]}>
              <JournalIcon size={38} color="#37474F" />
            </View>
            <Text style={styles.featureText}>Journal</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleGetStarted} activeOpacity={0.8} style={styles.buttonContainer}>
          <LinearGradient
            colors={['#8CCAED', '#80CBC5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.carouselSection}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            scrollEventThrottle={16}
            style={styles.carousel}>
            {carouselImages.map((image, index) => (
              <View key={index} style={[styles.carouselItem, { width: SCREEN_WIDTH }]}> 
                <Image source={image} style={styles.carouselImage} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
          <View style={styles.carouselIndicators}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentIndex ? '#37474F' : '#D1D1D1',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
});