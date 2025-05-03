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

const GetPremiumScreen: React.FC = () => {
	const handleUpgrade = () => {
		// TODO: обработчик покупки премиума
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@assets/main_bg.png')}
				style={styles.background}
				resizeMode='cover'
			/>
			{/* Кнопка назад */}
			<View style={styles.header}>
				<BackButton />
				<Text style={[styles.premiumTitle, TYPOGRAPHY.H2]}>PREMIUM</Text>
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
				<Image source={require('@assets/premium_page/one_time_purchase.png')} />
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
							<Text style={[styles.upgradeText, TYPOGRAPHY.H31]}>
								UPGRADE TO PREMIUM!
							</Text>
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
	premiumTitle: {
		width: width * 0.55,
		textAlign: 'center',
	},
	featuresList: {
		marginTop: height * 0.05,
		paddingHorizontal: width * 0.12,
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
	upgradeText: {},
})

export default GetPremiumScreen
