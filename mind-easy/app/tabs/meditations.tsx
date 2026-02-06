import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreathingExercisesIcon } from '@/components/icons/BreathingExercisesIcon';
import { StressReliefIcon } from '@/components/icons/StressReliefIcon';
import { SleepRelaxationIcon } from '@/components/icons/SleepRelaxationIcon';
import { FocusClarityIcon } from '@/components/icons/FocusClarityIcon';
import { useRouter } from 'expo-router';

const heroImage = require('@/assets/images/medit.png');

export default function MeditationsScreen() {
  const router = useRouter();

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.header}>Find your peace</Text>

				<View style={styles.heroCard}>
					<ImageBackground source={heroImage} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
						<Text style={styles.recommended}>Recommended{"\n"}Meditation</Text>
					</ImageBackground>
					<View style={styles.heroInner}>
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
						<View style={styles.tileIconCol}>
							<BreathingExercisesIcon />
							<Text style={styles.tileTimeUnder}>3–10 min</Text>
						</View>
						<Text style={styles.tileTitle}>Breathing{"\n"}exercises</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.tile, styles.tileGreen]}>
						<View style={styles.tileIconCol}>
							<StressReliefIcon />
							<Text style={styles.tileTimeUnder}>5–12 min</Text>
						</View>
						<Text style={styles.tileTitle}>Stress{"\n"}relief</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.gridRow}>
					<TouchableOpacity style={[styles.tile, styles.tileLilac]}>
						<View style={styles.tileIconCol}>
							<SleepRelaxationIcon />
							<Text style={styles.tileTimeUnder}>10–20 min</Text>
						</View>
						<Text style={styles.tileTitle}>Sleep &{"\n"}Relaxation</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.tile, styles.tileOrange]}>
						<View style={styles.tileIconCol}>
							<FocusClarityIcon />
							<Text style={styles.tileTimeUnder}>5–15 min</Text>
						</View>
						<Text style={styles.tileTitle}>Focus &{"\n"}Clarity</Text>
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
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 40,
    gap: 18,
  },
  header: {
    fontFamily: 'Jua_400Regular',
    fontSize: 32,
    color: '#263238',
    marginBottom: 6,
  },
  heroCard: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  heroImage: {
    width: 368,
    height: 140,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingLeft: 12,
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
    fontSize: 28,
    color: '#FFFFFF',
    marginLeft: 8,
    includeFontPadding: false,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meditTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#263238',
    marginLeft: 8,
  },
  meditSub: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 13,
    color: '#6D6D6D',
    marginTop: 4,
    marginLeft: 8,
  },
  startButton: {
    width: 69,
    height: 36.73,
    backgroundColor: '#C6F0DA',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  startText: {
    fontFamily: 'Jua_400Regular',
    fontSize: 15,
    color: '#1D3D30',
    textAlign: 'center',
    marginTop: 2,
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
  tileIconCol: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: -7,
    marginLeft: -10,
  },
  tile: {
    flex: 1,
    height: 110,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  },
  tileTitle: {
    fontFamily: 'Jua_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
    marginTop: 8,
  },
  tileTimeUnder: {
    fontFamily: 'IstokWeb_400Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    marginLeft: 8,
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

