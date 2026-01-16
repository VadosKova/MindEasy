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
});