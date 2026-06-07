import { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';
import { Image } from 'react-native';
import { useAppSettings } from '@/context/AppSettingsContext';
import { Colors } from '@/constants/theme';
import * as Linking from 'expo-linking';
import { API_BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExportPDFScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];
  const bgColor = '#F5F5DC';

  const [fromDate, setFromDate] = useState('Jan 20, 2025');
  const [toDate, setToDate] = useState('Jan 20, 2026');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const toastAnim = useRef(new Animated.Value(80)).current;
  const [toastText, setToastText] = useState('');

  // Load available dates on mount
  useEffect(() => {
    const loadDates = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/api/export/dates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok && Array.isArray(json.dates) && json.dates.length > 0) {
          setAvailableDates(json.dates);
          setFromDate(new Date(json.dates[0]).toDateString());
          setToDate(new Date(json.dates[json.dates.length - 1]).toDateString());
        }
      } catch (err) {
        console.warn('Failed to load dates', err);
      }
    };
    loadDates();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}> 
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={32} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Export PDF report</Text>
      </View>

      <View style={styles.iconWrapper}>
        <Image
          source={require('../assets/images/PDFIcon.png')}
          style={{ width: 150, height: 150, resizeMode: 'contain' }}
        />
      </View>

      <TouchableOpacity onPress={() => setShowFromPicker(true)} style={[styles.dateCard, { backgroundColor: colors.card }]}> 
        <View style={styles.dateTextWrapper}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>From:</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{fromDate}</Text>
        </View>
        <DownArrowIcon size={18} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowToPicker(true)} style={[styles.dateCard, { backgroundColor: colors.card }]}> 
        <View style={styles.dateTextWrapper}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>To:</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{toDate}</Text>
        </View>
        <DownArrowIcon size={18} color={colors.text} />
      </TouchableOpacity>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter recipient email..."
        placeholderTextColor="#78909C"
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (!email) return alert('Please enter recipient email');
          try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/export/report`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ to: email, fromDate: new Date(fromDate).toISOString(), toDate: new Date(toDate).toISOString() }),
            });
            const json = await res.json();
            setLoading(false);
            if (res.ok && json.url) {
              Linking.openURL(json.url);
              // show success toast
              setToastText('Report generated and sent');
              Animated.timing(toastAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(() => {
                setTimeout(() => {
                  Animated.timing(toastAnim, { toValue: 80, duration: 400, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start();
                }, 3000);
              });
            } else {
              alert(json.error || 'Failed to generate report');
            }
          } catch (err) {
            setLoading(false);
            console.error(err);
            alert('Network error');
          }
        }}
      >
        <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate&Send report'}</Text>
      </TouchableOpacity>

      {/* From picker modal */}
      <Modal visible={showFromPicker} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select From date</Text>
            <FlatList
              data={availableDates}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setFromDate(new Date(item).toDateString()); setShowFromPicker(false); }} style={styles.modalItem}>
                  <Text style={{ color: colors.text }}>{new Date(item).toDateString()}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowFromPicker(false)} style={styles.modalClose}>
              <Text style={{ color: colors.text }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* To picker modal */}
      <Modal visible={showToPicker} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select To date</Text>
            <FlatList
              data={availableDates}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setToDate(new Date(item).toDateString()); setShowToPicker(false); }} style={styles.modalItem}>
                  <Text style={{ color: colors.text }}>{new Date(item).toDateString()}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowToPicker(false)} style={styles.modalClose}>
              <Text style={{ color: colors.text }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 12 }}>Generating report...</Text>
        </View>
      )}

      {/* Toast */}
      <Animated.View style={[styles.toast, { transform: [{ translateY: toastAnim }], backgroundColor: '#333' }]}>
        <Text style={{ color: '#fff' }}>{toastText}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 8,
  },
  backButton: { 
    width: 36, 
    alignItems: 'flex-start' 
  },
  title: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 80,
    marginTop: 70,
  },
  dateCard: {
    width: 313,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateTextWrapper: {
    flexDirection: 'column',
  },
  dateLabel: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
  },
  dateValue: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 16,
    marginTop: 2,
  },
  input: {
    width: 313,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 15,
    marginBottom: 24,
    marginTop: 18,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  button: {
    width: 313,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E50000',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontFamily: 'Jua_400Regular', fontSize: 18, marginBottom: 8 },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  modalClose: { padding: 12, alignItems: 'center' },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageBox: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
  },
});
