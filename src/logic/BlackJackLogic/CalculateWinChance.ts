import { PlayingCardType } from '@/types/PlayingCard'

const getCardValue = (card: string): number => {
	if (['K', 'Q', 'J'].includes(card)) return 10
	if (card === 'A') return 11
	return parseInt(card, 10)
}

const calculateHandValue = (cards: PlayingCardType[]): number => {
	let total = 0
	let aceCount = 0

	for (const card of cards) {
		const value = getCardValue(card.value)
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
	const dealerValue = getCardValue(dealerCard.value)

	if (dealerCard.value === 'A') return 5 // Ace - very dangerous
	if (dealerValue >= 10) return 4 // 10, J, Q, K - strong cards
	if (dealerValue >= 7) return 3 // 7, 8, 9 - good cards
	if (dealerValue === 6 || dealerValue === 5) return 2 // average cards
	if (dealerValue <= 4) return 1 // 2, 3, 4 — weak cards

	return 3 // default
}

export const calculateWinChance = (
	playerCards: PlayingCardType[],
	dealerCard: PlayingCardType
): number => {
	const playerTotal = calculateHandValue(playerCards)
	const dangerLevel = dealerDangerLevel(dealerCard)

	if (playerTotal > 21) return 0 // Bust - lose
	if (playerTotal === 21 && playerCards.length === 2) return 99 // Blackjack (2 cards) - win
	if (playerTotal === 21) return 95 // 21 - win

	let baseChance = 50

	// The higher the amount, the better the chance
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
