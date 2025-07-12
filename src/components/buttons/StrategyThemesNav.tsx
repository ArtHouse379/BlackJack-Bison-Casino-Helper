import { TYPOGRAPHY } from '@/constants/typography'
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

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
		<ImageBackground
			style={styles.bgImage}
			source={require('@assets/themes_plate.png')}
			resizeMode='contain'
		>
			<View style={styles.container}>
				<Pressable
					style={[styles.button, styles.leftArrow]}
					onPress={() => onPressHandler('left')}
				>
					{({ pressed }) => (
						<Image
							source={
								pressed
									? require('@assets/leftArrowClicked.png')
									: require('@assets/leftArrow.png')
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
									? require('@assets/rightArrowClicked.png')
									: require('@assets/rightArrow.png')
							}
							style={styles.image}
						/>
					)}
				</Pressable>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	bgImage: {
		width: 225,
		height: 65,
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'relative',
		opacity: 0.8,
	},
	text: {
		width: 120,
		textAlign: 'center',
	},
	button: {
		position: 'absolute',
		top: 10,
	},
	image: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
	},
	leftArrow: {
		left: 15,
	},
	rightArrow: {
		right: 15,
	},
})

export default StrategyThemesNavButton
