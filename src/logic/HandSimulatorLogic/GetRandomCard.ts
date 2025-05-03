const CARD_VALUES = [
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'J',
	'Q',
	'K',
	'A',
]
const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades']

export type Card = {
	value: string
	suit: string
}

export function generateRandomCard(excluded: Card[]): Card {
	const allCards: Card[] = []

	for (const value of CARD_VALUES) {
		for (const suit of CARD_SUITS) {
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
