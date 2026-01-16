import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { MicIcon } from '@/components/icons/MicIcon';

interface JournalEntry {
  id: string;
  mood: 'great' | 'okay' | 'low';
  text: string;
  timestamp: Date;
}

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

  const handleSaveEntry = () => {
    if (!selectedMood) {
      Alert.alert('Please select your mood before saving');
      return;
    }

    if (journalText.trim() === '') {
      Alert.alert('Please write something in your journal');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      text: journalText,
      timestamp: new Date(),
    };

    setEntries([newEntry, ...entries]);
    setJournalText('');
    setSelectedMood(null);
  };
  
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
          placeholderTextColor="#999"
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>
        </View>
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
    color: '#263238',
  },
  searchButton: {
    padding: 8,
  },
  moodSection: {
    marginBottom: 20,
  },
  moodQuestion: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: '#263238',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#F4B35E',
  },
  moodButtonText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#263238',
  },
});