import { ActionType, PlayingCardType } from '@/types/PlayingCard'
import {
	simulateDouble,
	simulateHit,
	simulateSplit,
	simulateStand,
} from './actions'

interface GameState {
	playerHand: PlayingCardType[]
	dealerCard: PlayingCardType
	action: ActionType
}

export function calculateWinningProbability(gameState: GameState): number {
	const { playerHand, dealerCard, action } = gameState

	switch (action) {
		case 'HIT':
			return simulateHit(playerHand, dealerCard)
		case 'STAND':
			return simulateStand(playerHand, dealerCard)
		case 'DOUBLE':
			return simulateDouble(playerHand, dealerCard)
		case 'SPLIT':
			return simulateSplit(playerHand, dealerCard)
		default:
			return 0
	}
}
