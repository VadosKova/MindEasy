import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function RainScene() {
  return (
    <Video
      source={require('@/assets/videos/rain.mp4')}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
    />
  );
}