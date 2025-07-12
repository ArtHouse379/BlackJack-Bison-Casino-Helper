import BackButton from '@/components/buttons/BackButton'
import { TYPOGRAPHY } from '@/constants/typography'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../../App'

const { width, height } = Dimensions.get('window')

type NavigationProp = StackNavigationProp<RootStackParamList, 'History'>

const HistoryScreen: React.FC = () => {
	const [analysisType, setAnalysisType] = React.useState('ANALYSIS TYPE')
	const navigation = useNavigation<NavigationProp>()

	const handleFullReport = () => {
		navigation.navigate('Premium')
	}

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
		>
			<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* Back button and header */}
					<View style={styles.header}>
						<BackButton />

						<Image
							source={require('@assets/page_headers/hand_history_header.png')}
							resizeMode='contain'
							style={{ width: width * 0.6 }}
						/>
					</View>

					{/* Analysis selection drop down list */}
					<View style={styles.dropdownContainer}>
						<View>
							<ImageBackground
								source={require('@assets/history_page/history_theme_banner.png')}
								resizeMode='contain'
								style={styles.dropdown}
							>
								<Text style={TYPOGRAPHY.H5}>{analysisType}</Text>
								<Image
									source={require('@assets/search_icon.png')}
									style={styles.searchIcon}
								/>
							</ImageBackground>
						</View>
					</View>

					{/* History cards */}
					<View style={styles.cardsContainer}>
						<View style={styles.card}>
							<Text style={[styles.cardTitle, TYPOGRAPHY.H27]}>
								PLAYED BLACKJACK HAND
							</Text>
							<Text style={[styles.cardSubtitle, TYPOGRAPHY.H28]}>
								ANALYSIS AVAILABLE
							</Text>
						</View>
						<View style={styles.card}>
							<Text style={[styles.cardTitle, TYPOGRAPHY.H27]}>
								DOUBLED DOWN ON 11
							</Text>
							<Text style={[styles.cardSubtitle, TYPOGRAPHY.H28]}>
								CORRECT MOVE!
							</Text>
						</View>
					</View>

					{/* Full report button */}
					<View style={styles.fullReportContainer}>
						<Pressable style={styles.primaryButton} onPress={handleFullReport}>
							{({ pressed }) => (
								<ImageBackground
									style={styles.buttonBgImage}
									resizeMode='contain'
									source={
										pressed
											? require('@assets/buttons/history_report_clicked.png')
											: require('@assets/buttons/history_report.png')
									}
								>
									<Text style={[TYPOGRAPHY.H33]}>VIEW FULL REPORT</Text>
								</ImageBackground>
							)}
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	background: {
		flex: 1,
	},
	header: {
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerText: {
		alignItems: 'center',
	},
	dropdownContainer: {
		width: width,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: height * 0.01,
	},
	dropdown: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		height: 48,
	},
	searchIcon: {
		position: 'absolute',
		right: width * 0.25,
		top: 10,
		tintColor: '#fff',
	},
	cardsContainer: {
		marginTop: 32,
		alignItems: 'center',
	},
	card: {
		backgroundColor: '#76BDFF',
		opacity: 0.88,
		borderRadius: 6,
		width: width * 0.88,
		paddingVertical: 18,
		paddingHorizontal: 12,
		marginBottom: 18,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
	},
	cardTitle: {
		color: '#0084FF',
		marginBottom: 6,
		textAlign: 'center',
	},
	cardSubtitle: {
		textAlign: 'right',
	},
	fullReportContainer: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: height * 0.05,
		width: '100%',
		alignItems: 'center',
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	buttonBgImage: {
		width: width,
		height: 72,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default HistoryScreen
