import { TYPOGRAPHY } from '@/constants/typography'
import { createNewUserProfile } from '@/utils/createUserProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
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

// Pre-require all background images
const backgroundImages = [
	require('@assets/welcome_bg.png'),
	require('@assets/welcome_bg_1.png'),
	require('@assets/welcome_bg_2.png'),
	require('@assets/welcome_bg_3.png'),
]

const textBanners = [
	'Master Blackjack strategies and maximize your wins!',
	'Use the hand calculator to make optimal decisions!',
	'Simulate real blackjack hands and practice risk-free!',
	'Upgrade to premium for advanced tools and analytics!',
]

const bannerStyles = StyleSheet.create({
	0: {
		justifyContent: 'center',
	},
	1: {
		justifyContent: 'flex-start',
	},
	2: {
		marginTop: height * 0.09,
	},
	3: {
		marginTop: height * 0.32,
	},
})

const WelcomeScreen: React.FC = () => {
	const navigation = useNavigation()
	const [currentScreenIndx, setCurrentBgImageIndx] = React.useState(0)

	useEffect(() => {
		// Проверяем, есть ли профиль, если нет — создаём
		;(async () => {
			const profile = await AsyncStorage.getItem('userProfile')
			if (!profile) {
				await createNewUserProfile()
			}
		})()
	}, [])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={backgroundImages[currentScreenIndx]}
				style={styles.background}
				resizeMode='cover'
			/>
			<StatusBar style='light' />

			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={TYPOGRAPHY.H1}>Play smart. Win more.</Text>
					<Image
						source={require('@assets/logo.png')}
						resizeMode='center'
						style={styles.headerImage}
					/>
				</View>

				<View
					style={[
						styles.middleTextContainer,
						bannerStyles[currentScreenIndx as keyof typeof bannerStyles],
					]}
				>
					{/* <Text style={[TYPOGRAPHY.H3, { textAlign: 'center' }]}>
						Master Blackjack strategies and maximize your wins!
					</Text> */}
					<Text
						style={[
							TYPOGRAPHY.H3,
							{ textAlign: 'center', maxWidth: 330, alignSelf: 'center' },
						]}
					>
						{textBanners[currentScreenIndx]}
					</Text>
				</View>

				<View style={styles.actionContainer}>
					<Pressable
						style={styles.primaryButton}
						onPress={() => {
							navigation.navigate('StrategyGuide' as never)
						}}
					>
						{({ pressed }) => (
							<>
								<Image
									source={
										pressed
											? require('../../assets/buttons/button_xl_clicked.png')
											: require('../../assets/buttons/button_xl.png')
									}
								/>
								<Text style={[TYPOGRAPHY.H31, styles.startBtn]}>
									Start Learning
								</Text>
							</>
						)}
					</Pressable>
				</View>

				<View style={styles.bottomFlat}>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={() => {
							setCurrentBgImageIndx(0)
							navigation.navigate('MainMenu' as never)
						}}
					>
						<Text style={TYPOGRAPHY.H4}>Skip</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={() => {
							if (currentScreenIndx >= 3) {
								setCurrentBgImageIndx(0)
								navigation.navigate('MainMenu' as never)
							} else setCurrentBgImageIndx(currentScreenIndx + 1)
						}}
					>
						<Text style={TYPOGRAPHY.H4}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: height * 0.06,
		paddingHorizontal: 45,
	},
	header: {
		alignItems: 'center',
	},
	headerImage: {
		width: 355,
		height: 186,
		marginBottom: 16,
	},
	middleTextContainer: {
		flex: 1,
	},
	actionContainer: {
		alignItems: 'center',
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	secondaryButton: {
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
	},
	startBtn: {
		position: 'absolute',
		top: 25,
	},
	bottomFlat: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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

export default WelcomeScreen
