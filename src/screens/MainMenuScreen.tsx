import ProfileButton from '@/components/buttons/ProfileButton'
import SettingsButton from '@/components/buttons/SettingsButton'
import { TYPOGRAPHY } from '@/constants/typography'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const MainMenuScreen: React.FC = () => {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@assets/main_bg.png')}
				style={styles.background}
				resizeMode='cover'
			/>

			<View style={styles.header}>
				<ProfileButton />

				<SettingsButton />
			</View>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('StrategyGuide' as never)
					}}
				>
					<Image source={require('@assets/menu_cards/strategy.png')} />
					<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
						BLACKJACK STRATEGY GUIDE
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('HandDecision' as never)
					}}
				>
					<Image source={require('@assets/menu_cards/calc.png')} />
					<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
						HAND CALCULATOR
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('Statistics' as never)
					}}
				>
					<Image source={require('@assets/menu_cards/statistic.png')} />
					<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
						PROGRESS & STATISTICS
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('HandSimulator' as never)
					}}
				>
					<Image source={require('@assets/menu_cards/simulator.png')} />
					<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>HAND SIMULATOR</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.actionContainer}>
				<Pressable
					style={styles.primaryButton}
					onPress={() => {
						navigation.navigate('MainMenu' as never)
					}}
				>
					{({ pressed }) => (
						<Image
							source={
								pressed
									? require('@assets/buttons/button_xl_clicked.png')
									: require('@assets/buttons/button_xl.png')
							}
						/>
					)}
				</Pressable>
				<Text disabled style={[TYPOGRAPHY.H31, styles.startBtn]}>
					Start Learning
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: height * 0.07,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		position: 'relative',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: height * 0.1,
	},
	buttonsContainer: {
		marginBottom: height * 0.2,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 24,
	},
	button: {
		width: width * 0.4,
		aspectRatio: 1,
		position: 'relative',
	},
	buttonText: {
		position: 'absolute',
		width: 155,
		bottom: height * 0.012,
		left: 10,
		textAlign: 'center',
	},
	actionContainer: {
		alignItems: 'center',
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	startBtn: {
		position: 'absolute',
		top: 25,
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

export default MainMenuScreen
