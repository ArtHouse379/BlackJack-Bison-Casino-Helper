import ActionButton from '@/components/buttons/ActionButton'
import BackButton from '@/components/buttons/BackButton'
import ResultDisplay from '@/components/ResultDisplay'
import CardDisplay from '@/components/views/CardDisplay'
import CardPickerModal from '@/components/views/CardPickerModal'
import { CARD_VALUES } from '@/constants/cards'
import { TYPOGRAPHY } from '@/constants/typography'
import { calculateWinningProbability } from '@/logic/BlackJackLogic/probability'
import { useBlackjackStore } from '@/store/BlackJackStore'
import { CalculationResult } from '@/types/Calculation'
import { PlayingCardType } from '@/types/PlayingCard'
import { getUserProfile } from '@/utils/getUserProfile'
import { updateUserProfile } from '@/utils/updateUserProfile'
import React, { useEffect } from 'react'
import {
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const getRandomCard = (): PlayingCardType => {
	const randomIndex = Math.floor(Math.random() * CARD_VALUES.length)
	return CARD_VALUES[randomIndex] as PlayingCardType
}

const HandDecisionScreen: React.FC = () => {
	const [modalVisible, setModalVisible] = React.useState(false)
	const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
	const [editingDealer, setEditingDealer] = React.useState(false)
	const {
		playerCards,
		dealerCard,
		selectedAction,
		winChance,
		updatePlayerCard,
		setPlayerCards,
		setDealerCard,
		setSelectedAction,
		setWinChance,
		resetGame,
	} = useBlackjackStore()

	useEffect(() => {
		// Инициализация случайных карт при загрузке
		const initialPlayerCards = [getRandomCard(), getRandomCard()]
		const initialDealerCard = getRandomCard()
		setPlayerCards(initialPlayerCards)
		setDealerCard(initialDealerCard)
	}, [])

	const actionButtonsPaths = {
		regular: require('@assets/buttons/action_button_medium.png'),
		clicked: require('@assets/buttons/action_button_medium_clicked.png'),
	}

	const handleRecalculate = () => {
		if (!dealerCard || playerCards.length < 2 || !selectedAction) return

		const probability = calculateWinningProbability({
			playerHand: playerCards,
			dealerCard,
			action: selectedAction,
		})

		setWinChance(probability)
	}

	useEffect(() => {
		if (!dealerCard || !selectedAction || !winChance) return
		;(async () => {
			const calculationResult: CalculationResult = {
				createAt: new Date().toISOString(),
				playerCards: playerCards,
				upCard: dealerCard,
				selectedAction: selectedAction,
				winChance: winChance,
			}
			const userProfile = await getUserProfile()
			if (userProfile !== undefined) {
				const userProfileCalculationHistory: CalculationResult[] =
					userProfile.calculationsHistory || []
				updateUserProfile({
					...userProfile,
					calculationsHistory: [
						...userProfileCalculationHistory,
						calculationResult,
					],
				})
			}
		})()
	}, [winChance])

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
		>
			<View style={styles.container}>
				{/* Кнопка назад */}
				<View style={styles.header}>
					<BackButton propsFn={resetGame} />
				</View>

				{/* Заголовок страницы */}
				<View style={styles.headerText}>
					<Text
						style={[
							TYPOGRAPHY.H2,
							{ width: 220, textAlign: 'center', marginBottom: 30 },
						]}
					>
						Hand Decision Calculator
					</Text>
				</View>

				{/* Секция с картами игрока */}
				<View style={styles.section}>
					<ImageBackground
						source={require('@assets/player_cards_placeholder.png')}
						accessible={false}
						resizeMode='contain'
						style={styles.cardContainer}
					>
						<Text style={[TYPOGRAPHY.H12, styles.sectionTitle]}>
							PLAYER CARDS
						</Text>
					</ImageBackground>
					<View style={styles.cardsContainer}>
						{playerCards.map((card, index) => (
							<CardDisplay
								key={index}
								value={card.value}
								suit={card.suit}
								onEdit={() => {
									setEditingIndex(index)
									setEditingDealer(false)
									setModalVisible(true)
								}}
							/>
						))}
					</View>
				</View>

				{/* Секция с картой дилера */}
				<View style={styles.section}>
					<ImageBackground
						source={require('@assets/up_card_placeholder.png')}
						accessible={false}
						resizeMode='contain'
						style={styles.cardContainer}
					>
						<Text style={[TYPOGRAPHY.H12, styles.sectionTitle]}>UP CARD</Text>
					</ImageBackground>
					<View style={styles.cardsContainer}>
						{dealerCard && (
							<CardDisplay
								value={dealerCard.value}
								suit={dealerCard.suit}
								onEdit={() => {
									setEditingDealer(true)
									setModalVisible(true)
								}}
							/>
						)}
					</View>
				</View>

				{/* Секция с кнопками действий */}
				<View style={styles.actionsContainer}>
					<View style={styles.actionsRow}>
						<ActionButton
							active={selectedAction === 'HIT' ? true : false}
							image={actionButtonsPaths.regular}
							clicked={actionButtonsPaths.clicked}
							title='HIT'
							onPress={() => setSelectedAction('HIT')}
						/>
						<ActionButton
							active={selectedAction === 'DOUBLE' ? true : false}
							image={actionButtonsPaths.regular}
							clicked={actionButtonsPaths.clicked}
							title='DOUBLE'
							onPress={() => setSelectedAction('DOUBLE')}
						/>
						<ActionButton
							active={selectedAction === 'STAND' ? true : false}
							image={actionButtonsPaths.regular}
							clicked={actionButtonsPaths.clicked}
							title='STAND'
							onPress={() => setSelectedAction('STAND')}
						/>
					</View>
					<View style={styles.splitButtonContainer}>
						<ActionButton
							active={selectedAction === 'SPLIT' ? true : false}
							image={actionButtonsPaths.regular}
							clicked={actionButtonsPaths.clicked}
							title='SPLIT'
							onPress={() => setSelectedAction('SPLIT')}
						/>
					</View>
				</View>

				{/* Секция с результатом */}
				<ResultDisplay percentage={winChance} />

				{/* Кнопка пересчета */}
				<Pressable
					disabled={!selectedAction}
					style={styles.recalculateButtonContainer}
					onPress={handleRecalculate}
				>
					{({ pressed }) => (
						<>
							<Image
								style={styles.recalculateButton}
								source={
									pressed
										? require('@assets/buttons/recalculate_button_clicked.png')
										: require('@assets/buttons/recalculate_button.png')
								}
							/>
							<Text style={[TYPOGRAPHY.H31, styles.recalculateText]}>
								Recalculate
							</Text>
						</>
					)}
				</Pressable>
			</View>
			<CardPickerModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				usedCards={[...playerCards, ...(dealerCard ? [dealerCard] : [])]}
				onSelect={card => {
					if (editingDealer) {
						setDealerCard(card)
					} else if (editingIndex !== null) {
						updatePlayerCard(editingIndex, card)
					}
				}}
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		marginTop: height * 0.06,
	},
	headerText: {
		alignItems: 'center',
		marginTop: -40,
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 1,
	},
	cardContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 220,
		height: 50,
	},
	section: {
		marginBottom: height * 0.02,
	},
	sectionTitle: {
		textAlign: 'center',
	},
	cardsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 45,
		flexWrap: 'wrap',
		marginTop: height * 0.01,
	},
	actionsContainer: {
		paddingVertical: height * 0.02,
	},
	actionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: height * 0.02,
	},
	splitButtonContainer: {
		alignItems: 'center',
	},
	recalculateButtonContainer: {
		alignItems: 'center',
		marginTop: height * 0.03,
	},
	recalculateButton: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	recalculateText: {
		position: 'absolute',
		bottom: 25,
	},
})

export default HandDecisionScreen
