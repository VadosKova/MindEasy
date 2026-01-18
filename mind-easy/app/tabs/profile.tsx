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

export default function ProfileScreen() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'User',
    joinDate: 'May 2025',
    whyUseApp: 'To feel calmer and understand myself better',
    goals: ['Feel calmer', 'Sleep better', 'Handle anxiety'],
    reminders: ['Daily check-in', 'Meditation reminder'],
  });

  const [editNameModal, setEditNameModal] = useState(false);
  const [editWhyModal, setEditWhyModal] = useState(false);
  const [editPictureModal, setEditPictureModal] = useState(false);

  const [editingName, setEditingName] = useState(profile.name);
  const [editingWhy, setEditingWhy] = useState(profile.whyUseApp);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <SettingsIcon size={28} color="#37474F" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.profilePictureContainer}
          onPress={() => setEditPictureModal(true)}
        >
          <LinearGradient
            colors={['#FFB6E1', '#DDA0DD', '#9370DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profilePicture}
          >
            <Text style={styles.cameraIcon}>📷</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.nameSection}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setEditingName(profile.name);
                setEditNameModal(true);
              }}
            >
              <EditIcon size={20} color="#37474F" />
            </TouchableOpacity>
          </View>
          <Text style={styles.joinDate}>Mindful since {profile.joinDate}</Text>
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
    marginBottom: 28,
  },
  header: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    color: '#263238',
  },
  settingsButton: {
    padding: 8,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 40,
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Jua_400Regular',
    fontSize: 22,
    color: '#263238',
  },
  joinDate: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#999',
  },
});