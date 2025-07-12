import { PlayingCardType } from '@/types/PlayingCard'

export const getHandValue = (cards: PlayingCardType[]): number => {
	let total = 0
	let aces = 0

	cards.forEach(card => {
		const { value } = card
		if (['K', 'Q', 'J'].includes(value)) {
			total += 10
		} else if (value === 'A') {
			aces += 1
			total += 11 // count aces as 11
		} else {
			total += parseInt(value, 10)
		}
	})

	// If it's too much - convert the aces to 1
	while (total > 21 && aces > 0) {
		total -= 10
		aces -= 1
	}

	return total
}
