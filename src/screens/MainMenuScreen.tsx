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
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const MainMenuScreen: React.FC = () => {
	const navigation = useNavigation()

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
			resizeMode='cover'
		>
			<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.header}>
						<ProfileButton />

						<SettingsButton />
					</View>

					<View style={styles.buttonsContainer}>
						<View style={[styles.btnContainer, { marginRight: 24 }]}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('StrategyGuide' as never)
								}}
							>
								<Image
									style={styles.btnImage}
									resizeMode='contain'
									source={require('@assets/menu_cards/strategy.png')}
								/>
								<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
									BLACKJACK STRATEGY GUIDE
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('HandDecision' as never)
								}}
							>
								<Image
									style={styles.btnImage}
									resizeMode='contain'
									source={require('@assets/menu_cards/calc.png')}
								/>
								<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
									HAND CALCULATOR
								</Text>
							</TouchableOpacity>
						</View>
						<View style={[styles.btnContainer, { marginRight: 24 }]}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Statistics' as never)
								}}
							>
								<Image
									style={styles.btnImage}
									resizeMode='contain'
									source={require('@assets/menu_cards/statistic.png')}
								/>
								<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
									PROGRESS & STATISTICS
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('HandSimulator' as never)
								}}
							>
								<Image
									style={styles.btnImage}
									resizeMode='contain'
									source={require('@assets/menu_cards/simulator.png')}
								/>
								<Text style={[TYPOGRAPHY.H5, styles.buttonText]}>
									HAND SIMULATOR
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.actionContainer}>
						<Pressable
							style={styles.primaryButton}
							onPress={() => {
								navigation.navigate('MainMenu' as never)
							}}
						>
							{({ pressed }) => (
								<>
									<Image
										resizeMode='contain'
										source={
											pressed
												? require('@assets/buttons/button_xl_clicked.png')
												: require('@assets/buttons/button_xl.png')
										}
									/>
									<Text style={[TYPOGRAPHY.H31, styles.startBtn]}>
										Start Learning
									</Text>
								</>
							)}
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 30,
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: height * 0.05,
	},
	btnContainer: {
		width: (width - 30 * 2 - 24) / 2,
		marginBottom: 24,
		position: 'relative',
	},
	btnImage: {
		width: '100%',
	},
	buttonText: {
		position: 'absolute',
		width: '90%',
		bottom: height * 0.015,
		left: '5%',
		textAlign: 'center',
	},
	actionContainer: {
		alignItems: 'center',
		marginVertical: height * 0.08,
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	startBtn: {
		position: 'absolute',
		top: 25,
	},
})

export default MainMenuScreen
