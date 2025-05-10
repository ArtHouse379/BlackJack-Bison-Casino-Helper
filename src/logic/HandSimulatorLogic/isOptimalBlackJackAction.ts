import { ActionType, PlayingCardType } from '@/types/PlayingCard'

export const isOptimalBlackjackAction = (
	playerCards: PlayingCardType[],
	dealerCards: PlayingCardType[],
	action: ActionType
): boolean => {
	// Если у дилера нет карты и у игрока меньше двух карт — не считаем ход ошибочным
	if (playerCards.length < 2 && dealerCards.length === 0) return true
	if (dealerCards.length === 0) return false

	// Определяем значения для расчета оптимальности хода
	const playerTotal = getHandTotal(playerCards)
	const dealerUpcard = dealerCards[0]
	const dealerValue = getCardNumericValue(dealerUpcard.value)
	const isSoft = handIsSoft(playerCards)
	const canSplit =
		playerCards.length === 2 && playerCards[0].value === playerCards[1].value

	// SPLIT
	if (action === 'SPLIT') {
		if (!canSplit) return false
		const pairValue = getCardNumericValue(playerCards[0].value)
		// Примеры из базовой стратегии:
		if (pairValue === 8 || pairValue === 11) return true // всегда сплитить A-A и 8-8
		if (pairValue === 10 || pairValue === 5) return false // никогда не сплитить 10-10, 5-5
		if (pairValue === 9) return dealerValue !== 7 && dealerValue < 10
		if (pairValue === 2 || pairValue === 3) return dealerValue <= 7
		if (pairValue === 6) return dealerValue <= 6
		return false
	}

	// DOUBLE
	if (action === 'DOUBLE') {
		if (playerCards.length > 2) return false

		if (isSoft) {
			// Soft Double (A + X)
			if (playerTotal === 18 && dealerValue >= 2 && dealerValue <= 6)
				return true
			if (playerTotal === 17 && dealerValue >= 3 && dealerValue <= 6)
				return true
			if (playerTotal === 16 && dealerValue >= 4 && dealerValue <= 6)
				return true
			if (playerTotal === 15 && dealerValue >= 4 && dealerValue <= 6)
				return true
			return false
		} else {
			// Hard Double
			if (playerTotal === 11) return true
			if (playerTotal === 10 && dealerValue <= 9) return true
			if (playerTotal === 9 && dealerValue >= 3 && dealerValue <= 6) return true
			return false
		}
	}

	// STAND
	if (action === 'STAND') {
		if (isSoft && playerTotal >= 19) return true
		if (!isSoft && playerTotal >= 17) return true
		if (!isSoft && playerTotal === 16 && dealerValue <= 6) return true
		if (!isSoft && playerTotal === 13 && dealerValue <= 6) return true
		if (!isSoft && playerTotal === 12 && dealerValue >= 4 && dealerValue <= 6)
			return true
		return false
	}

	// HIT
	if (action === 'HIT') {
		return !isOptimalBlackjackAction(playerCards, dealerCards, 'STAND') &&
			!isOptimalBlackjackAction(playerCards, dealerCards, 'DOUBLE')
			? true
			: false
	}

	return false
}

const getCardNumericValue = (value: string): number => {
	if (value === 'A') return 11
	if (['K', 'Q', 'J'].includes(value)) return 10
	return parseInt(value, 10)
}

const getHandTotal = (cards: PlayingCardType[]): number => {
	let total = 0
	let aces = 0
	for (const card of cards) {
		const val = getCardNumericValue(card.value)
		if (card.value === 'A') aces++
		total += val
	}
	// adjust for soft hands
	while (total > 21 && aces > 0) {
		total -= 10
		aces--
	}
	return total
}

const handIsSoft = (cards: PlayingCardType[]): boolean => {
	let total = 0
	let hasAce = false
	for (const card of cards) {
		if (card.value === 'A') hasAce = true
		total += getCardNumericValue(card.value)
	}
	return hasAce && total <= 21
}
