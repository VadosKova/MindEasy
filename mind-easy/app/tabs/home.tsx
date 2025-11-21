import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { MoodBadIcon } from '@/components/icons/MoodBadIcon';
import { MoodLowIcon } from '@/components/icons/MoodLowIcon';
import { MoodOkayIcon } from '@/components/icons/MoodOkayIcon';
import { MoodGoodIcon } from '@/components/icons/MoodGoodIcon';
import { MoodGreatIcon } from '@/components/icons/MoodGreatIcon';
import { IntroMeditateIcon } from '@/components/icons/IntroMeditateIcon';
import { IntroJournalIcon } from '@/components/icons/IntroJournalIcon';
import { QuoteIcon } from '@/components/icons/QuoteIcon';
import { HandIcon } from '@/components/icons/HandIcon';

const introImage = require('@/assets/images/home-intro.png');

const MOOD_OPTIONS = [
  { label: 'Bad', Icon: MoodBadIcon },
  { label: 'Low', Icon: MoodLowIcon },
  { label: 'Okay', Icon: MoodOkayIcon },
  { label: 'Good', Icon: MoodGoodIcon },
  { label: 'Great', Icon: MoodGreatIcon },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground source={introImage} style={styles.heroCard} imageStyle={styles.heroImage}>
          <Text style={styles.heroGreeting}>Hello User! <HandIcon/></Text>
          <Text style={styles.heroSubtitle}>How are you feeling today?</Text>
        </ImageBackground>

        <View style={[styles.card, styles.shadowSoft]}>
          <Text style={styles.sectionTitle}>Track your mood</Text>
          <View style={styles.moodRow}>
            {MOOD_OPTIONS.map(({ label, Icon }) => (
              <View key={label} style={styles.moodItem}>
                <Icon size={32} />
                <Text style={styles.moodLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity style={[styles.quickCard, styles.meditationCard, styles.shadowPurple]}>
            <IntroMeditateIcon size={38} />
            <View>
              <Text style={styles.quickTitle}>Start Meditation</Text>
              <Text style={styles.quickSubtitle}>10 min • Guided</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickCard, styles.journalCard, styles.shadowPurple]}>
            <IntroJournalIcon size={38} />
            <View>
              <Text style={styles.quickTitle}>Daily Reflection</Text>
              <Text style={styles.quickSubtitle}>Write your thoughts</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.shadowSoft]}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Your progress</Text>
            <Text style={styles.progressPercent}>60%</Text>
          </View>
          <View style={styles.progressRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>Streak</Text>
              <Text style={styles.statValue}>4 Days</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>Total Days</Text>
              <Text style={styles.statValue}>25 Days</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>Meditated</Text>
              <Text style={styles.statValue}>142 Min</Text>
            </View>
          </View>
        </View>

        <View style={[styles.quoteCard, styles.shadowSoft]}>
          <QuoteIcon />
          <Text style={styles.quoteText}>
            “Peace comes from within. Do not seek it without.”{'\n'}
            <Text style={styles.quoteAuthor}>– Buddha</Text>
          </Text>
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
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  heroCard: {
    width: '100%',
    minHeight: 150,
    borderRadius: 18,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 18,
  },
  heroGreeting: {
    fontFamily: 'Jua_400Regular',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  sectionTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#263238',
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    alignItems: 'center',
    gap: 6,
  },
  moodLabel: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#37474F',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 14,
  },
  quickCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  meditationCard: {
    backgroundColor: '#7974D0',
  },
  journalCard: {
    backgroundColor: '#43A047',
  },
  quickTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  quickSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#E1F5FE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressPercent: {
    fontFamily: 'Jua_400Regular',
    fontSize: 22,
    color: '#43A047',
  },
  progressRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  statBadge: {
    flex: 1,
    backgroundColor: '#FFF6CC',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#6D6D6D',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#263238',
  },
  quoteCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#E4F2D4',
    borderRadius: 18,
    padding: 18,
    alignItems: 'flex-start',
  },
  quoteText: {
    flex: 1,
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#37474F',
  },
  quoteAuthor: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#37474F',
  },
  shadowPurple: {
    shadowColor: '#7974D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  shadowSoft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
