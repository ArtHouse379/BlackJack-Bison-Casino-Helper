import { ActionType, PlayingCardType } from './PlayingCard'

export interface CalculationResult {
	createAt: string
	playerCards: PlayingCardType[]
	upCard: PlayingCardType
	selectedAction: ActionType
	winChance: number
}
