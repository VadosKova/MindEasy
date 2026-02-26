import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';
import { Image } from 'react-native';
import { useAppSettings } from '@/context/AppSettingsContext';
import { Colors } from '@/constants/theme';

export default function ExportPDFScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];
  const bgColor = '#F5F5DC';

  const [fromDate, setFromDate] = useState('Jan 20, 2025');
  const [toDate, setToDate] = useState('Jan 20, 2026');
  const [email, setEmail] = useState('');

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

      <View style={[styles.dateCard, { backgroundColor: colors.card }]}> 
        <View style={styles.dateTextWrapper}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>From:</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{fromDate}</Text>
        </View>
        <DownArrowIcon size={18} color={colors.text} />
      </View>

      <View style={[styles.dateCard, { backgroundColor: colors.card }]}> 
        <View style={styles.dateTextWrapper}>
          <Text style={[styles.dateLabel, { color: colors.text }]}>To:</Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>{toDate}</Text>
        </View>
        <DownArrowIcon size={18} color={colors.text} />
      </View>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email for sending report..."
        placeholderTextColor="#78909C"
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
      />

      <TouchableOpacity style={styles.button} onPress={() => { /* TODO: implement export action */ }}>
        <Text style={styles.buttonText}>Generate&Send report</Text>
      </TouchableOpacity>
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
});
