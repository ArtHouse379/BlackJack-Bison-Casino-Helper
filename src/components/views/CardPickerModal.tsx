import { CARD_SUITS, CARD_VALUES } from '@/constants/cards'
import { PlayingCardType } from '@/types/PlayingCard'
import React from 'react'
import {
	Dimensions,
	FlatList,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

interface CardPickerModalProps {
	visible: boolean
	onClose: () => void
	onSelect: (card: PlayingCardType) => void
	usedCards: PlayingCardType[]
}

const CardPickerModal: React.FC<CardPickerModalProps> = ({
	visible,
	onClose,
	onSelect,
	usedCards,
}) => {
	const isUsed = (card: PlayingCardType) =>
		usedCards.some(c => c.value === card.value && c.suit === card.suit)
	const suitColor = (suit: string) =>
		suit === 'hearts' || suit === 'diamonds' ? '#EF2929' : '#000000'
	return (
		<Modal transparent visible={visible} animationType='slide'>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<FlatList
						data={CARD_VALUES.filter(c => !isUsed(c))}
						keyExtractor={(item, index) =>
							`${item.value}-${item.suit}-${index}`
						}
						renderItem={({ item }) => (
							<Pressable
								style={styles.cardItem}
								onPress={() => {
									onSelect(item)
									onClose()
								}}
							>
								<Text
									style={{ color: suitColor(item.suit), fontWeight: 'bold' }}
								>
									{item.value}
								</Text>
								<Image
									source={CARD_SUITS[item.suit as keyof typeof CARD_SUITS]}
									style={{ width: 20, height: 20 }}
								/>
							</Pressable>
						)}
					/>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: 'white',
		width: width * 0.8,
		height: height * 0.6,
		borderRadius: 10,
		padding: 20,
	},
	cardItem: {
		flexDirection: 'row',
		columnGap: 10,
		justifyContent: 'space-between',
		padding: 6,
		margin: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		alignSelf: 'center',
	},
})

export default CardPickerModal
