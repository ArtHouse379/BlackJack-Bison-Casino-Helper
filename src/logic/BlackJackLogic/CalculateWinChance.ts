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

	if (dealerCard.value === 'A') return 5 // Туз — очень опасно
	if (dealerValue >= 10) return 4 // 10, J, Q, K — сильные карты
	if (dealerValue >= 7) return 3 // 7, 8, 9 — хорошие карты
	if (dealerValue === 6 || dealerValue === 5) return 2 // средние карты
	if (dealerValue <= 4) return 1 // 2, 3, 4 — слабые карты

	return 3 // по-умолчанию
}

export const calculateWinChance = (
	playerCards: PlayingCardType[],
	dealerCard: PlayingCardType
): number => {
	const playerTotal = calculateHandValue(playerCards)
	const dangerLevel = dealerDangerLevel(dealerCard)

	if (playerTotal > 21) return 0
	if (playerTotal === 21 && playerCards.length === 2) return 99 // Блэкджек (2 карты)
	if (playerTotal === 21) return 95

	let baseChance = 50

	// Чем выше сумма игрока, тем лучше шанс
	baseChance += (playerTotal - 12) * 5 // 5% за каждое очко сверх 12

	// Корректируем шанс в зависимости от опасности карты дилера
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

	// Если сумма игрока меньше 17 — шанс чуть хуже
	if (playerTotal < 17) {
		baseChance -= 10
	}

	// Ограничение шанса в диапазоне от 0 до 100
	baseChance = Math.max(0, Math.min(100, baseChance))

	return baseChance
}
