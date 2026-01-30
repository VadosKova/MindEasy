import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { useState, useEffect } from 'react';
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
const PROGRESS_VALUE = 0.6;

const MOOD_OPTIONS = [
  { label: 'Bad', Icon: MoodBadIcon },
  { label: 'Low', Icon: MoodLowIcon },
  { label: 'Okay', Icon: MoodOkayIcon },
  { label: 'Good', Icon: MoodGoodIcon },
  { label: 'Great', Icon: MoodGreatIcon },
];

interface Quote {
  _id: string;
  text: string;
  author: string;
}

const [quote, setQuote] = useState<Quote | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchQuote = async () => {
    try {
      const res = await fetch("http://192.168.88.15:5000/api/quotes/random");
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.log("Failed to load quote", error);
    } finally {
      setLoading(false);
    }
  };

  fetchQuote();
}, []);


const shadowPurpleWeb: any =
  Platform.OS === 'web'
    ? { boxShadow: '0px 0px 4px 4px rgba(121, 116, 208, 0.5)' }
    : {};

const shadowGreenWeb: any =
  Platform.OS === 'web'
    ? { boxShadow: '0px 0px 4px 4px rgba(84, 181, 110, 0.5)' }
    : {};

function ProgressRing() {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - PROGRESS_VALUE);

  return (
    <View style={styles.progressRingContainer}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E0E0E0"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#7ACCC8"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.progressRingLabel}>
        <Text style={styles.progressPercentText}>{Math.round(PROGRESS_VALUE * 100)}%</Text>
      </View>
    </View>
  );
}

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
                <Icon size={40} />
                <Text style={styles.moodLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={[styles.quickCard, styles.meditationCard, styles.shadowPurple, shadowPurpleWeb]}>
            <IntroMeditateIcon size={41} />
            <Text style={styles.quickTitle}>Start Meditation</Text>
            <Text style={styles.quickSubtitle}>5 min • Guided</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, styles.journalCard, styles.shadowGreen, shadowGreenWeb]}>
            <IntroJournalIcon size={41} />
            <Text style={styles.quickTitle}>Daily Reflection</Text>
            <Text style={styles.quickSubtitle}>Write your thoughts</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.shadowSoft]}>
          <Text style={styles.sectionTitle}>Your progress</Text>
          <View style={styles.progressRow}>
            <ProgressRing />
            <View style={styles.progressStats}>
              <View style={styles.progressStatsRow}>
                <View style={styles.statBadge}>
                  <Text style={styles.statLabel}>Streak</Text>
                  <Text style={styles.statValue}>4 Days</Text>
                </View>
                <View style={styles.statBadge}>
                  <Text style={styles.statLabel}>Total Days</Text>
                  <Text style={styles.statValue}>25 Days</Text>
                </View>
              </View>
              <View style={[styles.statBadge, styles.progressStatBottom]}>
                <Text style={styles.statLabel}>Meditated</Text>
                <Text style={styles.statValue}>142 Min</Text>
              </View>
            </View>
          </View>
        </View>
        
        {quote && (
          <View style={[styles.quoteCard, styles.shadowSoft]}>
            <View style={styles.quoteIconContainer}>
              <QuoteIcon />
            </View>
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>
                "{quote.text}"
              </Text>
              <Text style={styles.quoteAuthor}>– {quote.author}</Text>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 18,
  },
  heroCard: {
    width: '100%',
    minHeight: 150,
    borderRadius: 18,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 18,
  },
  heroGreeting: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 20,
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
    height: 117,
    flex: 1,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  meditationCard: {
    backgroundColor: '#7974D0',
  },
  journalCard: {
    backgroundColor: '#54B56E',
  },
  quickTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  quickSubtitle: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#E1F5FE',
    textAlign: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    gap: 24,
  },
  progressRingContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#37474F',
  },
  progressStats: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  progressStatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  progressStatBottom: {
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  statBadge: {
    flex: 1,
    height: 45,
    backgroundColor: '#F4F499',
    borderRadius: 7,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#37474F',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#00000',
  },
  quoteCard: {
    flexDirection: 'column',
    backgroundColor: '#E4F2D4',
    borderRadius: 18,
    padding: 18,
    alignItems: 'flex-start',
    gap: 14,
  },
  quoteIconContainer: {
    marginBottom: 8,
    marginTop: 0,
  },
  quoteContent: {
    width: '100%',
    alignItems: 'flex-start',
  },
  quoteText: {
    fontFamily: 'IstokWeb_400Regular',
    fontStyle: 'italic',
    fontSize: 14,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 8,
    marginTop: -15,
  },
  quoteAuthor: {
    fontFamily: 'Jua_400Regular',
    fontSize: 14,
    color: '#37474F',
    textAlign: 'center',
    width: '100%',
  },
  shadowPurple: {
    shadowColor: '#7974D0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  shadowGreen: {
    shadowColor: '#54B56E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  shadowSoft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
