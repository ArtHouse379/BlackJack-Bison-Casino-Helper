import { ActionType, PlayingCardType } from '@/types/PlayingCard'
import { create } from 'zustand'

interface BlackjackState {
	playerCards: PlayingCardType[]
	dealerCard: PlayingCardType | null
	selectedAction: ActionType | null
	winChance: number

	setPlayerCards: (cards: PlayingCardType[]) => void
	updatePlayerCard: (index: number, card: PlayingCardType) => void
	setDealerCardSafely: (card: PlayingCardType) => void
	setDealerCard: (card: PlayingCardType) => void
	setSelectedAction: (action: ActionType) => void
	setWinChance: (chance: number) => void
	resetGame: () => void
}

export const useBlackjackStore = create<BlackjackState>((set, get) => ({
	playerCards: [],
	dealerCard: null,
	selectedAction: null,
	winChance: 0,

	setPlayerCards: cards => set({ playerCards: cards }),

	updatePlayerCard: (index, card) => {
		const updated = [...get().playerCards]
		updated[index] = card
		set({ playerCards: updated })
	},

	setDealerCard: card => set({ dealerCard: card }),

	setDealerCardSafely: card => {
		const existingCards = get().playerCards
		if (
			!existingCards.some(c => c.value === card.value && c.suit === card.suit)
		) {
			set({ dealerCard: card })
		}
	},
	setSelectedAction: action => set({ selectedAction: action }),
	setWinChance: chance => set({ winChance: chance }),

	resetGame: () =>
		set({
			playerCards: [],
			dealerCard: null,
			selectedAction: null,
			winChance: 0,
		}),
}))
