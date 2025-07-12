import { PlayingCardType } from '@/types/PlayingCard'
import { create } from 'zustand'

interface SimulatorState {
	playerCards: PlayingCardType[]
	dealerCards: PlayingCardType[]
	opponentCards: PlayingCardType[]
	simulationTheme: string
	secondHandCards: PlayingCardType[]

	addPlayerCard: (card: PlayingCardType) => void
	addDealerCard: (card: PlayingCardType) => void
	addOpponentCard: (card: PlayingCardType) => void

	setPlayerCards: (cards: PlayingCardType[]) => void
	setSecondHandCards: (cards: PlayingCardType[]) => void
	setDealerCards: (cards: PlayingCardType[]) => void
	setOpponentCards: (cards: PlayingCardType[]) => void

	removeLastPlayerCard: () => void
	removeLastDealerCard: () => void
	removeLastOpponentCard: () => void

	setSimulationTheme: (theme: string) => void

	resetAll: () => void
}

export const useSimulatorStore = create<SimulatorState>()(set => ({
	playerCards: [],
	secondHandCards: [],

	dealerCards: [],
	opponentCards: [
		{ value: 'A', suit: 'diamonds' },
		{ value: 'K', suit: 'diamonds' },
		{ value: 'K', suit: 'spades' },
	],
	simulationTheme: 'heads-up',

	addPlayerCard: card =>
		set(state => ({ playerCards: [...state.playerCards, card] })),
	addDealerCard: card =>
		set(state => ({ dealerCards: [...state.dealerCards, card] })),
	addOpponentCard: card =>
		set(state => ({ opponentCards: [...state.opponentCards, card] })),

	setPlayerCards: cards => set({ playerCards: cards }),
	setSecondHandCards: cards => set({ secondHandCards: cards }),
	setDealerCards: cards => set({ dealerCards: cards }),
	setOpponentCards: cards => set({ opponentCards: cards }),

	removeLastPlayerCard: () =>
		set(state => ({ playerCards: state.playerCards.slice(0, -1) })),
	removeLastDealerCard: () =>
		set(state => ({ dealerCards: state.dealerCards.slice(0, -1) })),
	removeLastOpponentCard: () =>
		set(state => ({ opponentCards: state.opponentCards.slice(0, -1) })),

	setSimulationTheme: theme => set({ simulationTheme: theme }),

	resetAll: () =>
		set({
			playerCards: [],
			dealerCards: [],
			opponentCards: [
				{ value: 'A', suit: 'diamonds' },
				{ value: 'K', suit: 'diamonds' },
				{ value: 'K', suit: 'spades' },
			],
			simulationTheme: 'heads-up',
		}),
}))
