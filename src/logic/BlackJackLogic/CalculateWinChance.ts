import { DealerDangerLevel } from '@/constants/calculations/dangerLevel'
import {
	WIN_CHANCE_BASE_CHANCE,
	WIN_CHANCE_BLACKJACK,
	WIN_CHANCE_BUST,
	WIN_CHANCE_TWENTY_ONE,
} from '@/constants/calculations/winChances'
import { CARD_VALUE_MAP } from '@/constants/cardValues'
import { PlayingCardType } from '@/types/PlayingCard'

const calculateHandValue = (cards: PlayingCardType[]): number => {
	let total = 0
	let aceCount = 0

	for (const card of cards) {
		const value = CARD_VALUE_MAP[card.value]
		total += value
		if (card.value === 'A') aceCount++
	}

	while (total > 21 && aceCount > 0) {
		total -= 10
		aceCount--
	}

	return total
}

const dealerDangerLevel = (dealerCard: PlayingCardType): number => {
	const dealerValue = CARD_VALUE_MAP[dealerCard.value]

	if (dealerCard.value === 'A') return DealerDangerLevel.VeryDangerous
	if (dealerValue >= 10) return DealerDangerLevel.Strong
	if (dealerValue >= 7) return DealerDangerLevel.Good
	if (dealerValue === 6 || dealerValue === 5) return DealerDangerLevel.Average
	if (dealerValue <= 4) return DealerDangerLevel.Weak

	return DealerDangerLevel.Good
}

export const calculateWinChance = (
	playerCards: PlayingCardType[],
	dealerCard: PlayingCardType
): number => {
	const playerTotal = calculateHandValue(playerCards)
	const dangerLevel = dealerDangerLevel(dealerCard)

	if (playerTotal > 21) return WIN_CHANCE_BUST
	if (playerTotal === 21 && playerCards.length === 2)
		return WIN_CHANCE_BLACKJACK
	if (playerTotal === 21) return WIN_CHANCE_TWENTY_ONE

	let baseChance = WIN_CHANCE_BASE_CHANCE

	// Higher amount === better chance
	baseChance += (playerTotal - 12) * 5 // 5% for each point over 12

	// Changing the chance depending on the danger of the dealer's card
	switch (dangerLevel) {
		case 5:
			baseChance -= 25
			break
		case 4:
			baseChance -= 15
			break
		case 3:
			baseChance -= 5
			break
		case 2:
			baseChance += 5
			break
		case 1:
			baseChance += 10
			break
	}

	// If the player's amount is less than 17, the chance is slightly lower
	if (playerTotal < 17) {
		baseChance -= 10
	}

	// Chance limit in the range from 0 to 100
	baseChance = Math.max(0, Math.min(100, baseChance))

	return baseChance
}
