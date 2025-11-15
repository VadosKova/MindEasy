import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { UserIcon } from '@/components/icons/UserIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { LockIcon } from '@/components/icons/LockIcon';
import { useCarousel } from '@/hooks/useCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const carouselImages = [
  { uri: 'https://images.freeimages.com/images/large-previews/9b0/sunset-1344107.jpg' },
  { uri: 'https://th.bing.com/th/id/R.ab48afc6bf0eefb07e7dd1e30f6dcba8?rik=CAZjNPpZe%2bV0wg&pid=ImgRaw&r=0' },
  { uri: 'https://img.freepik.com/premium-photo/4k-desktop-wallpaper-hills-river-nature_485374-11875.jpg?w=740' },
];

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { scrollViewRef, currentIndex, handleScroll, handleScrollBeginDrag, handleScrollEndDrag } =
    useCarousel(carouselImages);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Enter a valid email address');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Registration completed!');
    }, 1000);
  };

  const handleLogin = () => router.push('/login');

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
});