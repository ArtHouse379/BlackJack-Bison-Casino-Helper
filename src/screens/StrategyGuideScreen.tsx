import BackButton from '@/components/buttons/BackButton'
import StrategyThemesNavButton from '@/components/buttons/StrategyThemesNav'
import StrategyGuidesList from '@/components/lists/StrategyGuidesList'
import { TEXTS } from '@/constants/texts'
import React from 'react'
import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
		>
			<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* Кнопка назад */}
					<View style={styles.header}>
						<BackButton />
					</View>

					{/* Заголовок страницы */}
					<View style={styles.headerText}>
						<Image
							source={require('@assets/page_headers/strategy_guid_header.png')}
							resizeMode='contain'
							style={{ marginBottom: height * 0.02 }}
						/>
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
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 20 },
	header: {
		alignItems: 'flex-start',
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
		flex: 1,
	},
})

export default StrategyGuideScreen
