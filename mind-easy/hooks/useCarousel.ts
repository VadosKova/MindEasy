import { useState, useRef, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function useCarousel(images: any[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  const scrollToNext = () => {
    const nextIndex = (currentIndexRef.current + 1) % images.length;
    scrollViewRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    setCurrentIndex(nextIndex);
    currentIndexRef.current = nextIndex;
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollIntervalRef.current = setInterval(scrollToNext, 3000);
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    if (!Number.isFinite(contentOffsetX) || !Number.isFinite(SCREEN_WIDTH) || SCREEN_WIDTH === 0) {
      return;
    }
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    const clampedIndex = Math.max(0, Math.min(images.length - 1, index));
    setCurrentIndex(clampedIndex);
    currentIndexRef.current = clampedIndex;
  };

  const handleScrollBeginDrag = () => {
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  }, []);

  return {
    scrollViewRef,
    currentIndex,
    handleScroll,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  };
}