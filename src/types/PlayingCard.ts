import { CARD_SUITS } from '@/constants/cards'
import { CARD_VALUE_MAP } from '@/constants/cardValues'

export interface PlayingCardType {
	value: keyof typeof CARD_VALUE_MAP
	suit: keyof typeof CARD_SUITS
}

export type ActionType = 'HIT' | 'STAND' | 'DOUBLE' | 'SPLIT'
