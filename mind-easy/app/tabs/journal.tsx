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