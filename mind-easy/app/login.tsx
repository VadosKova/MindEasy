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
import { MailIcon } from '@/components/icons/MailIcon';
import { LockIcon } from '@/components/icons/LockIcon';
import { useCarousel } from '@/hooks/useCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const carouselImages = [
  { uri: 'https://images.freeimages.com/images/large-previews/9b0/sunset-1344107.jpg' },
  { uri: 'https://th.bing.com/th/id/R.ab48afc6bf0eefb07e7dd1e30f6dcba8?rik=CAZjNPpZe%2bV0wg&pid=ImgRaw&r=0' },
  { uri: 'https://img.freepik.com/premium-photo/4k-desktop-wallpaper-hills-river-nature_485374-11875.jpg?w=740' },
];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { scrollViewRef, currentIndex, handleScroll, handleScrollBeginDrag, handleScrollEndDrag } =
    useCarousel(carouselImages);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://YOUR_IP:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Login failed");
        return;
      }

      console.log("TOKEN:", data.token);
      console.log("USER:", data.user);

      Alert.alert("Success", "Login successful!");
      router.replace("/tabs/home");
    } catch (error) {
      Alert.alert("Error", "Server connection error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/registration');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Welcome back!</Text>
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.iconContainer}>
                <MailIcon />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              <View style={styles.iconContainer}>
                <LockIcon />
              </View>
            </View>

            <TouchableOpacity style={styles.signInButton} activeOpacity={0.85} onPress={handleLogin} disabled={isLoading}>
              <LinearGradient
                colors={['#8CCAED', '#80CBC5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}>
                <Text style={styles.signInText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

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
              style={styles.carousel}
              removeClippedSubviews={false}>
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
    marginTop: 80,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Jua_400Regular',
    textAlign: 'center',
    color: '#37474F',
    marginBottom: 50,
  },
  form: {
    marginBottom: 40,
  },
  inputWrapper: {
    width: 311,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 18,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    fontFamily: 'IstokWeb_400Regular',
    color: '#37474F',
  },
  iconContainer: {
    marginLeft: 12,
  },
  signInButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 6,
    alignSelf: 'center',
  },
  buttonGradient: {
    width: 311,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 25,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Jua_400Regular',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: 'IstokWeb_400Regular',
    color: '#37474F',
    marginRight: 4,
  },
  signUpLink: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'IstokWeb_400Regular',
    color: '#80CBC5',
    fontWeight: '700',
  },
  carouselSection: {
    height: 200,
    marginBottom: 20,
    marginHorizontal: -20,
    marginTop: 128,
  },
  carousel: {
    flex: 1,
  },
  carouselItem: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: 225,
    height: 165,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    width: 11,
    height: 11,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});