import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { MicIcon } from '@/components/icons/MicIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface JournalEntry {
  _id: string;
  mood: 'great' | 'okay' | 'low';
  text: string;
  audioUrl?: string;
  createdAt: string;
}

const API_URL = "http://192.168.88.15:5000/api/journal";

const moodEmojis = {
  great: '😊',
  okay: '😐',
  low: '😔',
};

const moodLabels = {
  great: 'Great',
  okay: 'Okay',
  low: 'Low',
};

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<'great' | 'okay' | 'low' | null>(null);
  const [journalText, setJournalText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadEntries = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleSaveEntry = async () => {
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
        }),
      });

      const savedEntry = await response.json();

      setEntries(prev => [savedEntry, ...prev]);
      setJournalText("");
      setSelectedMood(null);
    } catch (error) {
      Alert.alert("Error saving journal entry");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${monthDay}, ${hours}:${minutes}`;
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTime}>{formatTime(item.createdAt)}</Text>
      <View style={styles.entryHeader}>
        <Text style={styles.entryMood}>{moodEmojis[item.mood]}</Text>
        <Text style={styles.entryMoodLabel}>Feeling {moodLabels[item.mood]}</Text>
      </View>
      {!!item.text && <Text style={styles.entryText}>{item.text}</Text>}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEnabled={entries.length > 0}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Journal</Text>
          <TouchableOpacity style={styles.searchButton}>
            <SearchIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.moodSection}>
          <Text style={styles.moodQuestion}>How do you feel today?</Text>
          <View style={styles.moodButtons}>
            <TouchableOpacity
              style={[
                styles.moodButton,
                selectedMood === 'great' && styles.moodButtonSelected,
              ]}
              onPress={() => setSelectedMood('great')}
            >
              <Text style={styles.moodButtonText}>😊 Great</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moodButton,
                selectedMood === 'okay' && styles.moodButtonSelected,
              ]}
              onPress={() => setSelectedMood('okay')}
            >
              <Text style={styles.moodButtonText}>😐 Okay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moodButton,
                selectedMood === 'low' && styles.moodButtonSelected,
              ]}
              onPress={() => setSelectedMood('low')}
            >
              <Text style={styles.moodButtonText}>😔 Low</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#37474F"
          multiline
          numberOfLines={5}
          value={journalText}
          onChangeText={setJournalText}
          textAlignVertical="top"
        />

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.voiceButton}>
            <View style={styles.voiceButtonContent}>
              <MicIcon />
              <Text style={styles.voiceButtonText}>Voice Note</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry} activeOpacity={0.8}>
            <LinearGradient
              colors={['#8CCAED', '#80CBC5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {entries.length > 0 && (
          <View style={styles.entriesContainer}>
            <Text style={styles.entryTitle}>Previous entries</Text>
            <FlatList
              data={entries}
              renderItem={renderEntry}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          </View>
        )}
      </ScrollView>
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
});