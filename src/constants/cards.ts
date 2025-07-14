import { CARD_VALUE_MAP } from './cardValues'

export const CARD_SUITS = {
	hearts: require('@assets/suits/hearts.png'),
	spades: require('@assets/suits/spades.png'),
	clubs: require('@assets/suits/clubs.png'),
	diamonds: require('@assets/suits/diamonds.png'),
}

export const CARD_PATHS = {
	A_diamonds: require('@assets/playing_cards/A_diamonds.png'),
	A_spades: require('@assets/playing_cards/A_spades.png'),
	A_hearts: require('@assets/playing_cards/A_hearts.png'),
	A_clubs: require('@assets/playing_cards/A_clubs.png'),
	K_clubs: require('@assets/playing_cards/K_clubs.png'),
	K_diamonds: require('@assets/playing_cards/K_diamonds.png'),
	K_hearts: require('@assets/playing_cards/K_hearts.png'),
	K_spades: require('@assets/playing_cards/K_spades.png'),
	Q_clubs: require('@assets/playing_cards/Q_clubs.png'),
	Q_spades: require('@assets/playing_cards/Q_spades.png'),
	Q_diamonds: require('@assets/playing_cards/Q_diamonds.png'),
	Q_hearts: require('@assets/playing_cards/Q_hearts.png'),
	J_clubs: require('@assets/playing_cards/J_clubs.png'),
	J_diamonds: require('@assets/playing_cards/J_diamonds.png'),
	J_hearts: require('@assets/playing_cards/J_hearts.png'),
	J_spades: require('@assets/playing_cards/J_spades.png'),
	'10_clubs': require('@assets/playing_cards/10_clubs.png'),
	'10_spades': require('@assets/playing_cards/10_spades.png'),
	'10_diamonds': require('@assets/playing_cards/10_diamonds.png'),
	'10_hearts': require('@assets/playing_cards/10_hearts.png'),
	'9_hearts': require('@assets/playing_cards/9_hearts.png'),
	'9_diamonds': require('@assets/playing_cards/9_diamonds.png'),
	'9_spades': require('@assets/playing_cards/9_spades.png'),
	'9_clubs': require('@assets/playing_cards/9_clubs.png'),
	'8_diamonds': require('@assets/playing_cards/8_diamonds.png'),
	'8_spades': require('@assets/playing_cards/8_spades.png'),
	'8_hearts': require('@assets/playing_cards/8_hearts.png'),
	'8_clubs': require('@assets/playing_cards/8_clubs.png'),
	'7_spades': require('@assets/playing_cards/7_spades.png'),
	'7_hearts': require('@assets/playing_cards/7_hearts.png'),
	'7_diamonds': require('@assets/playing_cards/7_diamonds.png'),
	'7_clubs': require('@assets/playing_cards/7_clubs.png'),
	'6_hearts': require('@assets/playing_cards/6_hearts.png'),
	'6_diamonds': require('@assets/playing_cards/6_diamonds.png'),
	'6_spades': require('@assets/playing_cards/6_spades.png'),
	'6_clubs': require('@assets/playing_cards/6_clubs.png'),
	'5_hearts': require('@assets/playing_cards/5_hearts.png'),
	'5_diamonds': require('@assets/playing_cards/5_diamonds.png'),
	'5_spades': require('@assets/playing_cards/5_spades.png'),
	'5_clubs': require('@assets/playing_cards/5_clubs.png'),
	'4_hearts': require('@assets/playing_cards/4_hearts.png'),
	'4_diamonds': require('@assets/playing_cards/4_diamonds.png'),
	'4_spades': require('@assets/playing_cards/4_spades.png'),
	'4_clubs': require('@assets/playing_cards/4_clubs.png'),
	'3_hearts': require('@assets/playing_cards/3_hearts.png'),
	'3_diamonds': require('@assets/playing_cards/3_diamonds.png'),
	'3_spades': require('@assets/playing_cards/3_spades.png'),
	'3_clubs': require('@assets/playing_cards/3_clubs.png'),
	'2_hearts': require('@assets/playing_cards/2_hearts.png'),
	'2_diamonds': require('@assets/playing_cards/2_diamonds.png'),
	'2_spades': require('@assets/playing_cards/2_spades.png'),
	'2_clubs': require('@assets/playing_cards/2_clubs.png'),
}

export const CARD_SUIT_PATH = require('@assets/playing_cards/card_suit.png')

export const CARD_VALUES = Object.keys(CARD_PATHS).map(key => {
	const value = key.split('_')
	return {
		value: value[0] as keyof typeof CARD_VALUE_MAP,
		suit: value[1] as keyof typeof CARD_SUITS,
	}
})
