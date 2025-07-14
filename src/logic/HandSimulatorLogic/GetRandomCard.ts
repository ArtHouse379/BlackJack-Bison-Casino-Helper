import { CARD_SUITS, CARD_VALUES } from '@/constants/cards'
import { CARD_VALUE_MAP } from '@/constants/cardValues'
import { PlayingCardType } from '@/types/PlayingCard'

export function generateRandomCard(
	excluded: PlayingCardType[]
): PlayingCardType {
	const allCards: PlayingCardType[] = []

	for (const value of Object.keys(CARD_VALUE_MAP) as Array<
		keyof typeof CARD_VALUE_MAP
	>) {
		for (const suit of Object.keys(CARD_SUITS) as Array<
			keyof typeof CARD_SUITS
		>) {
			allCards.push({ value, suit })
		}
	}

	const availableCards = allCards.filter(
		card =>
			!excluded.some(ex => ex.value === card.value && ex.suit === card.suit)
	)

	if (availableCards.length === 0) {
		throw new Error('No available cards left to draw')
	}

	const randomIndex = Math.floor(Math.random() * availableCards.length)
	return availableCards[randomIndex]
}

export const getRandomCard = (): PlayingCardType => {
	const randomIndex = Math.floor(Math.random() * CARD_VALUES.length)
	return CARD_VALUES[randomIndex] as PlayingCardType
}
