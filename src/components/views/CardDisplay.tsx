import { CARD_SUITS } from '@/constants/cards'
import { TYPOGRAPHY } from '@/constants/typography'
import React from 'react'
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

interface CardDisplayProps {
	value: string
	suit: string
	onEdit: () => void
}

const CardDisplay: React.FC<CardDisplayProps> = ({ value, suit, onEdit }) => {
	const suitColor =
		suit === 'hearts' || suit === 'diamonds' ? '#EF2929' : '#000000'

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@assets/card_info_placeholder.png')}
				style={styles.cardContainer}
				resizeMode='cover'
			>
				<Text style={[styles.cardText, { color: suitColor }, TYPOGRAPHY.H13]}>
					{value}
				</Text>
				<Image
					source={CARD_SUITS[suit as keyof typeof CARD_SUITS]}
					style={{ width: 20, height: 20 }}
				/>
			</ImageBackground>

			<Pressable onPress={onEdit}>
				{({ pressed }) => (
					<Image
						resizeMode='contain'
						source={
							pressed
								? require('@assets/edit_icon_clicked.png')
								: require('@assets/edit_icon.png')
						}
					/>
				)}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '30%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 50,
	},
	cardText: {
		marginRight: 5,
	},
})

export default CardDisplay
