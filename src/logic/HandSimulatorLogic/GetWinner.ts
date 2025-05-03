import { PlayingCardType } from '@/types/PlayingCard'
import { getHandValue } from './GetHandValue'

export const getWinner = (
	playerCards: PlayingCardType[],
	dealerCards: PlayingCardType[]
): string => {
	const playerTotal = getHandValue(playerCards)
	const dealerTotal = getHandValue(dealerCards)

	if (playerTotal > 21) return 'Player Busts — Dealer Wins'
	if (dealerTotal > 21) return 'Dealer Busts — Player Wins'
	if (playerTotal > dealerTotal) return 'Player Wins'
	if (dealerTotal > playerTotal) return 'Dealer Wins'
	return 'Draw'
}
