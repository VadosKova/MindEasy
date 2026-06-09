import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function OceanScene() {
  return (
    <Video
      source={require('../../../assets/videos/ocean_video.mp4')}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
    />
  );
}