import BackButton from '@/components/buttons/BackButton'
import { TYPOGRAPHY } from '@/constants/typography'
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

const { width, height } = Dimensions.get('window')

const HistoryScreen: React.FC = () => {
	const [analysisType, setAnalysisType] = React.useState('ANALYSIS TYPE')

	const handleFullReport = () => {
		// TODO: обработчик перехода к полному отчету
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@assets/main_bg.png')}
				style={styles.background}
			/>

			{/* Кнопка назад и заголовок */}
			<View style={styles.header}>
				<BackButton />

				<Text
					style={[TYPOGRAPHY.H2, { width: width * 0.6, textAlign: 'center' }]}
				>
					Hand History
				</Text>
			</View>

			{/* Выпадающий список выбора анализа */}
			<View style={styles.dropdownContainer}>
				<View>
					<ImageBackground
						source={require('@assets/history_page/history_theme_banner.png')}
						resizeMode='cover'
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

			{/* Карточки истории */}
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

			{/* Кнопка полного отчета */}
			<View style={styles.fullReportContainer}>
				<Pressable style={styles.primaryButton}>
					{({ pressed }) => (
						<ImageBackground
							style={styles.buttonBgImage}
							resizeMode='cover'
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
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: height * 0.06,
		paddingHorizontal: 20,
	},
	headerText: {
		alignItems: 'center',
		marginTop: -40,
	},
	dropdownContainer: {
		alignItems: 'center',
		marginTop: height * 0.01,
	},
	dropdown: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: width * 0.61,
		height: 48,
	},
	searchIcon: {
		position: 'absolute',
		right: 15,
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
		bottom: width * 0.4,
		width: '100%',
		alignItems: 'center',
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	buttonBgImage: {
		width: width * 0.63,
		height: 72,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
	},
})

export default HistoryScreen
