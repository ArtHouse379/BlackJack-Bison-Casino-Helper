import { ActionType, PlayingCardType } from './PlayingCard'

type SimulationResultType = 'win' | 'lose' | 'draw'
// | 'Player Wins'
// | 'Dealer Wins'
// | 'Draw'
// | `Player Busts — Dealer Wins`
// | `Dealer Busts — Player Wins`

export interface SimulationResult {
	createAt: string
	playerCards: PlayingCardType[]
	secondHand?: PlayingCardType[]
	opponentCars: PlayingCardType[]
	dealerCards: PlayingCardType[]
	selectedActions: ActionType[]
	simulationResult: SimulationResultType
}
