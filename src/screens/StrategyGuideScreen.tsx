import React from 'react'
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import BackButton from '../components/buttons/BackButton'
import StrategyThemesNavButton from '../components/buttons/StrategyThemesNav'
import StrategyGuidesList from '../components/lists/StrategyGuidesList'
import { TEXTS } from '../constants/texts'
import { TYPOGRAPHY } from '../constants/typography'

const themesList = [
	'Advanced tactics',
	'Basic strategy',
	'Card counting',
	'Bankroll management',
]
const { width, height } = Dimensions.get('window')

const StrategyGuideScreen: React.FC = () => {
	const [currentTheme, setCurrentTheme] = React.useState(themesList[0])
	const guidesText = TEXTS

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/main_bg.png')}
				style={styles.background}
			/>
			{/* Кнопка назад */}
			<View style={styles.header}>
				<BackButton />
			</View>

			{/* Заголовок страницы */}
			<View style={styles.headerText}>
				{/* <HeaderDecorator
					text='STATISTICS & PROGRESS'
					gradientColors={['#FF00FF', '#76BDFF']}
					fontSize={28}
				/> */}
				<Text style={[styles.title, TYPOGRAPHY.H2]}>
					BLACKJACK STRATEGY GUIDE
				</Text>
			</View>

			<StrategyThemesNavButton
				theme={currentTheme}
				setCurrentTheme={setCurrentTheme}
				themes={themesList}
				index={themesList.findIndex(theme => theme === currentTheme)}
			/>

			<StrategyGuidesList
				list={guidesText[currentTheme as keyof typeof guidesText]}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		marginTop: height * 0.06,
	},
	headerText: {
		alignItems: 'center',
		marginTop: -40,
	},
	title: {
		width: 250,
		textAlign: 'center',
		marginBottom: 15,
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 1,
	},
})

export default StrategyGuideScreen
