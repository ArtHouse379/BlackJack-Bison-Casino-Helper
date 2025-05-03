import { PlayingCardType } from '@/types/PlayingCard'

const suits = ['hearts', 'diamonds', 'clubs', 'spades']
const values = [
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'J',
	'Q',
	'K',
	'A',
]

export function getRandomCard(exclude: { value: string; suit: string }[]): {
	value: string
	suit: string
} {
	let card: PlayingCardType
	do {
		card = {
			value: values[Math.floor(Math.random() * values.length)],
			suit: suits[Math.floor(Math.random() * suits.length)],
		}
	} while (exclude.find(c => c.value === card.value && c.suit === card.suit))
	return card
}
