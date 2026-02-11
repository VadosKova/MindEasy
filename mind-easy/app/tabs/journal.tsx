import { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from "expo-haptics";
import { SearchIcon } from '@/components/icons/SearchIcon';
import { MicIcon } from '@/components/icons/MicIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioModule, useAudioRecorder } from "expo-audio";
import { File } from "expo-file-system/next";
import AudioPlayer from "@/components/AudioPlayer";

import { useAppSettings } from "@/context/AppSettingsContext";
import { Colors } from "@/constants/theme";
import { translations } from "@/constants/i18n";

interface JournalEntry {
  _id: string;
  mood: 'great' | 'okay' | 'low';
  text: string;
  audioUrl?: string;
  createdAt: string;
}

const API_URL = "http://192.168.88.15:5000/api/journal";


export default function JournalScreen() {
  const router = useRouter();
  const { theme, language } = useAppSettings();
  const colors = Colors[theme];
  const t = translations[language];

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<'great' | 'okay' | 'low' | null>(null);
  const [journalText, setJournalText] = useState('');
  const [loading, setLoading] = useState(false);

  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // const recorder = useAudioRecorder({
  //   extension: ".m4a",
  //   sampleRate: 44100,
  //   numberOfChannels: 1,
  //   bitRate: 128000,

  //   android: {
  //     outputFormat: AudioModule.AndroidOutputFormat.MPEG_4,
  //     audioEncoder: AudioModule.AndroidAudioEncoder.AAC,
  //   },

  //   ios: {
  //     outputFormat: AudioModule.IOSOutputFormat.MPEG4AAC,
  //     audioQuality: AudioModule.IOSAudioQuality.HIGH,
  //   },

  //   web: {
  //     mimeType: "audio/webm",
  //   },
  // });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hapticIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const handlePressIn = () => {
    setIsHolding(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let step = 0;
    hapticIntervalRef.current = setInterval(() => {
      step++;
      if (step < 5) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      else if (step < 10) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 200);

    timerRef.current = setTimeout(() => {
      cleanupSOS();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/sos");
    }, 3000);
  };

  const cancelPress = () => {
    setIsHolding(false);
    cleanupSOS();
  };

  const cleanupSOS = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
  };

  const moodEmojis = {
    great: '😊',
    okay: '😐',
    low: '😔',
  };

  const moodLabels = {
    great: t.greatMood,
    okay: t.okayMood,
    low: t.lowMood,
  };

  const loadEntries = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Load journal error:", error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // const startRecording = async () => {
  //   const permission = await AudioModule.requestRecordingPermissionsAsync();
  //   if (!permission.granted) {
  //     Alert.alert("Microphone permission required");
  //     return;
  //   }

  //   try {
  //     await recorder.record();
  //     setIsRecording(true);
  //     setAudioUri(null);
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //   } catch (e) {
  //     console.log("record start error", e);
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     await recorder.stop();

  //     setIsRecording(false);

  //     if (recorder.uri) {
  //       setAudioUri(recorder.uri);
  //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  //     }

  //   } catch (e) {
  //     console.log("record stop error", e);
  //   }
  // };

  // const getAudioBase64 = async () => {
  //   if (!audioUri) return null;

  //   const file = new File(audioUri);
  //   const base64 = await file.base64();

  //   return `data:audio/m4a;base64,${base64}`;
  // };

  const handleSaveEntry = async () => {
    //const audioBase64 = await getAudioBase64();

    if (!selectedMood) {
      Alert.alert('Please select your mood');
      return;
    }

    if (!journalText.trim()) {
      Alert.alert('Please write something');
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood,
          text: journalText,
          //audio: audioBase64,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        Alert.alert(err.message || "Save failed");
        return;
      }

      await loadEntries();
      setJournalText("");
      setAudioUri(null);
      setSelectedMood(null);
    } catch (error) {
      Alert.alert("Error saving journal entry");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${monthDay}, ${hours}:${minutes}`;
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entryCard}>
      <Text style={[styles.entryTime, { color: colors.text }]}>{formatTime(item.createdAt)}</Text>
      <View style={styles.entryHeader}>
        <Text style={styles.entryMood}>{moodEmojis[item.mood]}</Text>
        <Text style={[styles.entryMoodLabel, { color: colors.text }]}>{t.feeling} {moodLabels[item.mood]}</Text>
      </View>
      {!!item.text && <Text style={[styles.entryText, { color: colors.text }]}>{item.text}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {isHolding && (
        <View style={styles.sosOverlay}>
          <Text style={styles.sosOverlayText}>{t.holdForSOS}</Text>
        </View>
      )}
      <Pressable 
        style={{ flex: 1 }} 
        onLongPress={handlePressIn}
        delayLongPress={500}
        onPressOut={cancelPress}
      >
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => String(item._id)}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              <View style={styles.headerContainer}>
                <Text style={[styles.header, { color: colors.text }]}>{t.journal}</Text>
                <TouchableOpacity style={styles.searchButton}><SearchIcon /></TouchableOpacity>
              </View>

              <View style={styles.moodSection}>
                <Text style={[styles.moodQuestion, { color: colors.text }]}>{t.howFeelToday}</Text>
                <View style={styles.moodButtons}>
                  {['great','okay','low'].map(mood => (
                    <TouchableOpacity
                      key={mood}
                      style={[styles.moodButton, { borderColor: colors.text }, selectedMood === mood && styles.moodButtonSelected]}
                      onPress={() => setSelectedMood(mood as 'great' | 'okay' | 'low')}
                    >
                      <Text style={[styles.moodButtonText, { color: colors.text }]}>
                        {moodEmojis[mood as keyof typeof moodEmojis]} {moodLabels[mood as keyof typeof moodLabels]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TextInput
                style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
                placeholder={t.writeThoughts}
                placeholderTextColor="#37474F"
                multiline
                numberOfLines={5}
                value={journalText}
                onChangeText={setJournalText}
                textAlignVertical="top"
              />

              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.voiceButton, isRecording && { backgroundColor: "#FF6B6B" }]} activeOpacity={0.7}>
                  <View style={styles.voiceButtonContent}>
                    <MicIcon />
                    <Text style={styles.voiceButtonText}>{isRecording ? "Recording..." : t.voiceNote}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#8CCAED', '#80CBC5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.saveButtonText}>{t.saveEntry}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {entries.length > 0 && (
                <Text style={[styles.entryTitle, { color: colors.text }]}>{t.prevEntries}</Text>
              )}

              {audioUri && (
                <AudioPlayer url={audioUri} />
              )}
            </>
          }
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    color: '#37474F',
  },
  searchButton: {
    padding: 8,
  },
  moodSection: {
    marginBottom: 20,
  },
  moodQuestion: {
    fontFamily: 'Jua_400Regular',
    fontSize: 20,
    color: '#37474F',
    marginBottom: 12,
  },
  moodButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  moodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#F4B35E',
  },
  moodButtonText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: '#263238',
  },
  textInput: {
    backgroundColor: '#E0E0C9',
    borderRadius: 12,
    padding: 14,
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: '#37474F',
    minHeight: 120,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  voiceButton: {
    width: 140,
    flex: 1,
    backgroundColor: '#C4CF01',
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  voiceButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  voiceButtonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  entriesContainer: {
    marginTop: 50,
  },
  entryTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 20,
    color: '#37474F',
    marginBottom: 12,
    marginLeft: 10,
  },
  entryCard: {
    backgroundColor: '#E0E0C9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  entryTime: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#78909C',
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  entryMood: {
    fontSize: 24,
  },
  entryMoodLabel: {
    fontFamily: 'IstokWeb_700Bold',
    fontSize: 16,
    color: '#37474F',
    marginTop: 4,
  },
  entryText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#37474F',
    lineHeight: 20,
  },
  sosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(229, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    pointerEvents: 'none',
  },
  sosOverlayText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 24,
    color: '#E50000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
});