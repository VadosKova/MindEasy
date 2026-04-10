import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function NightScene() {
  return (
    <Video
      source={require('../../../assets/videos/night.mp4')}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
    />
  );
}