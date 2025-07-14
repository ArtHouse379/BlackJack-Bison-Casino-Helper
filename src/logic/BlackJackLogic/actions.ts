import { PlayingCardType } from '@/types/PlayingCard'
import { getRandomCard } from '../HandSimulatorLogic/GetRandomCard'
import { getCardValue, getHandValue } from './helpers'

export function simulateHit(
	playerHand: PlayingCardType[],
	dealerCard: PlayingCardType
): number {
	const newCard = getRandomCard()
	const newHand = [...playerHand, newCard]
	const value = getHandValue(newHand)

	if (value > 21) return 0 // Bust - lose
	if (value === 21) return 1 // Best case - win
	return 0.5 // Basic estimate, can be increased
}

export function simulateStand(
	playerHand: PlayingCardType[],
	dealerCard: PlayingCardType
): number {
	const playerValue = getHandValue(playerHand)
	const dealerValue = getCardValue(dealerCard)

	if (playerValue > dealerValue) return 0.7
	if (playerValue === dealerValue) return 0.5
	return 0.3
}

export function simulateDouble(
	playerHand: PlayingCardType[],
	dealerCard: PlayingCardType
): number {
	const newCard = getRandomCard()
	const doubledHand = [...playerHand, newCard]
	const value = getHandValue(doubledHand)

	return value > 21 ? 0 : 0.6 // risky, but have average chances
}

export function simulateSplit(
	playerHand: PlayingCardType[],
	dealerCard: PlayingCardType
): number {
	if (playerHand.length !== 2 || playerHand[0].value !== playerHand[1].value)
		return 0.1
	return 0.5 // Basic setting, adjustable by strategy
}
