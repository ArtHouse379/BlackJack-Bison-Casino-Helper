import { ActionType, PlayingCardType } from './PlayingCard'

type SimulationResultType = 'win' | 'lose' | 'draw'

export interface SimulationResult {
	createAt: string
	playerCards: PlayingCardType[]
	secondHand?: PlayingCardType[]
	playerActionsEfficiency: boolean[]
	opponentCars: PlayingCardType[]
	dealerCards: PlayingCardType[]
	selectedActions: ActionType[]
	simulationResult: SimulationResultType
}
