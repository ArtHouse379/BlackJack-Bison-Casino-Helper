import { PlayingCardType } from '@/types/PlayingCard'

export function getCardValue(card: PlayingCardType): number {
	const face = card.value
	if (['J', 'Q', 'K'].includes(face)) return 10
	if (face === 'A') return 11
	return parseInt(face, 10)
}

export function getHandValue(hand: PlayingCardType[]): number {
	let value = 0
	let aceCount = 0

	for (const card of hand) {
		const cardVal = getCardValue(card)
		value += cardVal
		if (card.value === 'A') aceCount += 1
	}

	while (value > 21 && aceCount > 0) {
		value -= 10
		aceCount -= 1
	}

	return value
}

export function drawRandomCard(): PlayingCardType {
	const values = [
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
	const suits = ['hearts', 'spades', 'clubs', 'diamonds']

	const value = values[Math.floor(Math.random() * values.length)]
	const suit = suits[Math.floor(Math.random() * suits.length)]

	return { value, suit }
}
