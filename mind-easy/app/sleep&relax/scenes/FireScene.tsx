import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function FireScene() {
  return (
    <Video
      source={require('@/assets/videos/fire.mp4')}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
    />
  );
}