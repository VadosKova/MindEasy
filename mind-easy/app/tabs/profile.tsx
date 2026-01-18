import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert, Image, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsIcon } from '@/components/icons/SettingsIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { CameraIcon } from '@/components/icons/CameraIcon';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [hoverPicture, setHoverPicture] = useState(false);

  const [editingName, setEditingName] = useState(profile.name);
  const [editingWhy, setEditingWhy] = useState(profile.whyUseApp);

  const handleSaveName = () => {
    if (editingName.trim() === '') {
      Alert.alert('Please enter a name');
      return;
    }
    setProfile({ ...profile, name: editingName });
    setEditNameModal(false);
  };

  const handleSaveWhy = () => {
    if (editingWhy.trim() === '') {
      Alert.alert('Please enter your reason');
      return;
    }
    setProfile({ ...profile, whyUseApp: editingWhy });
    setEditWhyModal(false);
  };

  const handleSavePicture = () => {
    setEditPictureModal(false);
  };

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
          onPressIn={() => setHoverPicture(true)}
          onPressOut={() => setHoverPicture(false)}
        >
          <ImageBackground
            source={require('@/assets/images/Ellipse 23.png')}
            style={styles.profilePicture}
            imageStyle={styles.profilePictureImage}
          >
            {hoverPicture && (
              <View style={styles.cameraOverlay}>
                <CameraIcon size={40} color="#FFFFFF" />
              </View>
            )}
          </ImageBackground>
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

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Why I use this app</Text>
            <TouchableOpacity
              onPress={() => {
                setEditingWhy(profile.whyUseApp);
                setEditWhyModal(true);
              }}
            >
              <EditIcon size={18} color="#37474F" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardText}>"{profile.whyUseApp}"</Text>
        </View>

        <View style={styles.twoColumnContainer}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>My goals</Text>
            {profile.goals.map((goal, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.checkbox}>☑</Text>
                <Text style={styles.listText}>{goal}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>Reminders</Text>
            {profile.reminders.map((reminder, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.checkbox}>☑</Text>
                <Text style={styles.listText}>{reminder}</Text>
              </View>
            ))}
          </View>
        </View>

        <Modal
        visible={editNameModal}
        transparent
        animationType="fade"
        onRequestClose={() => setEditNameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditNameModal(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Edit name</Text>

            <TextInput
              style={styles.modalInput}
              value={editingName}
              onChangeText={setEditingName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editWhyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setEditWhyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditWhyModal(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Why I use this app</Text>

            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              value={editingWhy}
              onChangeText={setEditingWhy}
              placeholder="Tell us why you use this app"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveWhy}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editPictureModal}
        transparent
        animationType="fade"
        onRequestClose={() => setEditPictureModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditPictureModal(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <LinearGradient
              colors={['#FFB6E1', '#DDA0DD', '#9370DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.largeProfilePicture}
            >
              <CameraIcon size={50} color="#FFFFFF" />
            </LinearGradient>

            <Text style={styles.modalTitle}>{profile.name}</Text>

            <TouchableOpacity style={styles.saveButton} onPress={handleSavePicture}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: '#37474F',
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
    overflow: 'hidden',
  },
  profilePictureImage: {
    borderRadius: 50,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
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
    color: '#000000',
  },
  joinDate: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#999',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#000000',
  },
  cardText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#263238',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
    marginBottom: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  checkbox: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  listText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#263238',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F5F5DC',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#263238',
    fontWeight: '600',
  },
  modalTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#263238',
    marginTop: 20,
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#263238',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalTextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  largeProfilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#D4F041',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#2A6F50',
    fontWeight: '600',
  },
});