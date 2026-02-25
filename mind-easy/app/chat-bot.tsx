import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackIcon } from '@/components/icons/BackIcon';
import { ChatbotIcon } from '@/components/icons/ChatbotIcon';
import { SendIcon } from '@/components/icons/SendIcon';
import GradientMessage from '@/components/GradientMessage';
import { Colors } from '@/constants/theme';
import { useAppSettings } from '@/context/AppSettingsContext';
import { API_BASE_URL } from '@/constants/api';

type Message = { id: string; from: 'user' | 'bot'; text: string };

export default function ChatBotScreen() {
  const router = useRouter();
  const { theme } = useAppSettings();
  const colors = Colors[theme];

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', from: 'bot', text: 'Hello! I am MindEasy bot. How can I help you today?' },
  ]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Додаємо стан завантаження
  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    flatRef.current?.scrollToEnd?.({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || isLoading) return;

    const userText = text.trim();
    const newMsg: Message = { id: Date.now().toString(), from: 'user', text: userText };
    
    setMessages(prev => [...prev, newMsg]);
    setText('');
    setIsLoading(true);

    try {
      // ВАЖЛИВО: Змінюємо endpoint на /api/chat
      const resp = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
      });

      const data = await resp.json();

      if (resp.ok) {
        const reply = data.reply || 'I couldn\'t process that. Try again.';
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), from: 'bot', text: reply }]);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.error('Chat bot fetch error:', err);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        from: 'bot', 
        text: 'Sorry, I am having trouble connecting to the server. Please check your connection.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.from === 'bot') {
      return (
        <View style={styles.botRow}>
          <ChatbotIcon size={43} />
          <View style={[styles.botBubble, { backgroundColor: '#FFFFFF' }]}>
            <Text style={styles.botText}>{item.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.userRow}>
        <GradientMessage style={styles.userBubble}>
          <Text style={styles.userText}>{item.text}</Text>
        </GradientMessage>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>MindEasy chatbot</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.logoWrap}>
        <ChatbotIcon size={120} />
      </View>

      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
        <View style={[styles.inputWrap, { backgroundColor: colors.card }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#9E9E9E"
            style={styles.input}
            editable={!isLoading}
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={styles.sendButtonTouch}
            disabled={isLoading}
          >
            <GradientMessage style={[styles.sendButton, { opacity: isLoading ? 0.6 : 1 }]}>
              <SendIcon size={20} />
            </GradientMessage>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  backButton: { width: 36, alignItems: 'flex-start' },
  headerTitle: { fontFamily: 'Jua_400Regular', fontSize: 32 },
  logoWrap: { alignItems: 'center', marginTop: 30, marginBottom: 8 },
  messagesContainer: {
    paddingHorizontal: 12, 
    paddingBottom: 20,
  },
  botRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 12 },
  botBubble: {
    marginLeft: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '75%',
    elevation: 1,
  },
  botText: { fontFamily: 'IstokWeb_400Regular', fontSize: 18, color: '#000000' },
  userRow: { alignItems: 'flex-end', marginTop: 12 },
  userBubble: { borderRadius: 16, paddingHorizontal: 15, paddingVertical: 10 },
  userText: { color: '#FFF', fontFamily: 'IstokWeb_400Regular', fontSize: 18 },
  inputWrap: {
    width: '90%',
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#37474F',
  },
  sendButtonTouch: { marginLeft: 8 },
  sendButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});