import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsIcon } from '@/components/icons/SettingsIcon';
import { EditIcon } from '@/components/icons/EditIcon';

interface ProfileData {
  name: string;
  joinDate: string;
  whyUseApp: string;
  goals: string[];
  reminders: string[];
}