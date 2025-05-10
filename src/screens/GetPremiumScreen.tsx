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
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const GetPremiumScreen: React.FC = () => {
	const handleUpgrade = () => {
		// TODO: обработчик покупки премиума
	}

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
			resizeMode='contain'
		>
			<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* Кнопка назад */}
					<View style={styles.header}>
						<BackButton />
						<Image
							source={require('@assets/page_headers/premium_header.png')}
							resizeMode='contain'
							style={[styles.premiumTitle]}
						/>
					</View>

					{/* Список преимуществ */}
					<View style={styles.featuresList}>
						<View style={styles.featureItem}>
							<Image source={require('@assets/premium_page/premium_1.png')} />
						</View>
						<View style={styles.featureItem}>
							<Image source={require('@assets/premium_page/premium_2.png')} />
						</View>
						<View style={styles.featureItem}>
							<Image source={require('@assets/premium_page/premium_3.png')} />
						</View>
						<View style={styles.featureItem}>
							<Image source={require('@assets/premium_page/premium_4.png')} />
						</View>
					</View>

					{/* Цена и описание */}
					<View style={styles.priceBlock}>
						<Image source={require('@assets/premium_page/premium_price.png')} />
						<Image
							source={require('@assets/premium_page/one_time_purchase.png')}
						/>
					</View>

					{/* Кнопка покупки */}
					<View style={styles.buttonContainer}>
						<Pressable style={styles.upgradeButton} onPress={handleUpgrade}>
							{({ pressed }) => (
								<ImageBackground
									source={
										pressed
											? require('@assets/buttons/button_3xl_clicked.png')
											: require('@assets/buttons/button_3xl.png')
									}
									style={styles.buttonBg}
									resizeMode='contain'
								>
									<Text style={TYPOGRAPHY.H31}>UPGRADE TO PREMIUM!</Text>
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	premiumTitle: {
		width: width * 0.6,
	},
	featuresList: {
		marginTop: height * 0.05,
		paddingHorizontal: width * 0.05,
	},
	featureItem: {
		alignItems: 'flex-start',
		marginBottom: height * 0.03,
	},
	priceBlock: {
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: height * 0.05,
	},
	buttonContainer: {
		alignItems: 'center',
		marginTop: height * 0.06,
	},
	upgradeButton: {
		width: width * 0.8,
		height: height * 0.1,
	},
	buttonBg: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default GetPremiumScreen
