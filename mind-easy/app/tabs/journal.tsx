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

}