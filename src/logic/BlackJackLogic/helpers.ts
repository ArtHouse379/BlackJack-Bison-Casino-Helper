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
