import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { TYPOGRAPHY } from '../../constants/typography'

interface StrategyThemesNavButtonProps {
	theme: string
	themes: string[]
	index: number
	setCurrentTheme: React.Dispatch<React.SetStateAction<string>>
}

const StrategyThemesNavButton: React.FC<StrategyThemesNavButtonProps> = ({
	theme,
	themes,
	index,
	setCurrentTheme,
}) => {
	const onPressHandler = (action: string) => {
		switch (action) {
			case 'left':
				if (index > 0) {
					setCurrentTheme(themes[index - 1])
				} else {
					setCurrentTheme(themes[themes.length - 1])
				}
				break
			case 'right':
				if (index < themes.length - 1) {
					setCurrentTheme(themes[index + 1])
				} else {
					setCurrentTheme(themes[0])
				}
				break
			default:
				break
		}
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.bgImage}
				source={require('../../../assets/themes_plate.png')}
			>
				<Pressable
					style={[styles.button, styles.leftArrow]}
					onPress={() => onPressHandler('left')}
				>
					{({ pressed }) => (
						<Image
							source={
								pressed
									? require('../../../assets/leftArrowClicked.png')
									: require('../../../assets/leftArrow.png')
							}
							style={styles.image}
						/>
					)}
				</Pressable>

				<Text style={[TYPOGRAPHY.H6, styles.text]} disabled>
					{theme}
				</Text>

				<Pressable
					style={[styles.button, styles.rightArrow]}
					onPress={() => onPressHandler('right')}
				>
					{({ pressed }) => (
						<Image
							source={
								pressed
									? require('../../../assets/rightArrowClicked.png')
									: require('../../../assets/rightArrow.png')
							}
							style={styles.image}
						/>
					)}
				</Pressable>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	bgImage: {
		width: 220,
		height: 60,
		flex: 1,
		justifyContent: 'center',
		position: 'relative',
		opacity: 0.8,
	},
	text: {
		position: 'absolute',
		top: 5,
		left: 50,
		width: 120,
		textAlign: 'center',
	},
	button: {
		position: 'absolute',
		top: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 15,
		height: 23,
		resizeMode: 'cover',
	},
	leftArrow: {
		left: 10,
	},
	rightArrow: {
		right: 10,
	},
})

export default StrategyThemesNavButton
