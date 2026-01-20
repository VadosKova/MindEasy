import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreathingExercisesIcon } from '@/components/icons/BreathingExercisesIcon';
import { StressReliefIcon } from '@/components/icons/StressReliefIcon';
import { SleepRelaxationIcon } from '@/components/icons/SleepRelaxationIcon';
import { FocusClarityIcon } from '@/components/icons/FocusClarityIcon';

const heroImage = require('@/assets/images/medit.png');

export default function MeditationsScreen() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.header}>Find your peace</Text>

				<View style={styles.heroCard}>
					<ImageBackground source={heroImage} style={styles.heroImage} imageStyle={styles.heroImageStyle} />
					<View style={styles.heroInner}>
						<Text style={styles.recommended}>Recommended{"\n"}Meditation</Text>
						<View style={styles.recommendRow}>
							<View>
								<Text style={styles.meditTitle}>Calm Breathing</Text>
								<Text style={styles.meditSub}>5 min</Text>
							</View>
							<TouchableOpacity style={styles.startButton}>
								<Text style={styles.startText}>Start</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={styles.gridRow}>
					<TouchableOpacity style={[styles.tile, styles.tilePurple]}>
						<View style={styles.tileRow}>
							<View style={styles.iconCol}>
								<BreathingExercisesIcon />
								<Text style={styles.tileTimeUnder}>3–10 min</Text>
							</View>
							<Text style={styles.tileTitle}>Breathing exercises</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.tile, styles.tileGreen]}>
						<View style={styles.tileRow}>
							<View style={styles.iconCol}>
								<StressReliefIcon />
								<Text style={styles.tileTimeUnder}>5–12 min</Text>
							</View>
							<Text style={styles.tileTitle}>Stress relief</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.gridRow}>
					<TouchableOpacity style={[styles.tile, styles.tileLilac]}>
						<View style={styles.tileRow}>
							<View style={styles.iconCol}>
								<SleepRelaxationIcon />
								<Text style={styles.tileTimeUnder}>10–20 min</Text>
							</View>
							<Text style={styles.tileTitle}>Sleep & Relaxation</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.tile, styles.tileOrange]}>
						<View style={styles.tileRow}>
							<View style={styles.iconCol}>
								<FocusClarityIcon />
								<Text style={styles.tileTimeUnder}>5–15 min</Text>
							</View>
							<Text style={styles.tileTitle}>Focus & Clarity</Text>
						</View>
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
    gap: 18,
    paddingBottom: 40,
  },
  header: {
    fontFamily: 'Jua_400Regular',
    fontSize: 28,
    color: '#263238',
    marginBottom: 6,
  },
  heroCard: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  heroImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  heroImageStyle: {
    width: '100%',
    height: 140,
  },
  heroInner: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  recommended: {
    fontFamily: 'Jua_400Regular',
    fontSize: 20,
    color: '#263238',
    includeFontPadding: false,
    marginBottom: 8,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meditTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#263238',
  },
  meditSub: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: '#6D6D6D',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#C6F0DA',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  startText: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 14,
    color: '#2A6F50',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  tileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCol: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tile: {
    flex: 1,
    height: 110,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
  },
  tileTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
    flexShrink: 1,
  },
  tileTimeUnder: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.95)',
    marginTop: 8,
    marginLeft: 6,
    alignSelf: 'flex-start',
  },
  tilePurple: {
    backgroundColor: '#667BD6',
  },
  tileGreen: {
    backgroundColor: '#54B56E',
  },
  tileLilac: {
    backgroundColor: '#7974D0',
  },
  tileOrange: {
    backgroundColor: '#F2B04D',
  },
});

