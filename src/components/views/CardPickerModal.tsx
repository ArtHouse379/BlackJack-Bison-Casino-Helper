import { CARD_VALUES } from '@/constants/cards'
import { PlayingCardType } from '@/types/PlayingCard'
import React from 'react'
import {
	Dimensions,
	FlatList,
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
								<Text>
									{item.value} of {item.suit}
								</Text>
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
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		alignSelf: 'center',
	},
})

export default CardPickerModal
