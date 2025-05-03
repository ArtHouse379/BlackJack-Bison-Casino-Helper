import { CARD_PATHS } from '@/constants/cards'
import { PlayingCardType } from '@/types/PlayingCard'
import AnimatedCard from './AnimatedCard'

const RenderCards = ({
	cards,
	style,
}: {
	cards: PlayingCardType[]
	style?: any
}) => {
	return (
		<>
			{cards.map((card, index) => {
				const path =
					CARD_PATHS[`${card.value}_${card.suit}` as keyof typeof CARD_PATHS]
				return (
					<AnimatedCard
						key={`${card.value}_${card.suit}_${index}`}
						source={path}
						style={[{ marginRight: -20 }, style]}
					/>
				)
			})}
		</>
	)
}

export default RenderCards
