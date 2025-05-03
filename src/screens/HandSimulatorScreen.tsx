import ActionButton from '@/components/buttons/ActionButton'
import BackButton from '@/components/buttons/BackButton'
import AnimatedCard from '@/components/cards/AnimatedCard'
import RenderCards from '@/components/cards/RenderCards'
import { CARD_SUIT_PATH } from '@/constants/cards'
import { TYPOGRAPHY } from '@/constants/typography'
import { getHandValue } from '@/logic/HandSimulatorLogic/GetHandValue'
import { generateRandomCard } from '@/logic/HandSimulatorLogic/GetRandomCard'
import { getWinner } from '@/logic/HandSimulatorLogic/GetWinner'
import { saveSimulationToUserProfile } from '@/logic/HandSimulatorLogic/saveSimulationResult'
import { useSimulatorStore } from '@/store/Simulator/SimulatorStore'
import { ActionType, PlayingCardType } from '@/types/PlayingCard'
import { SimulationResult } from '@/types/SimulationResult'
import React from 'react'
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

const HandSimulatorScreen: React.FC = () => {
	const themes = ['tournament play', 'casino table strategy', 'heads-up']
	const [choosedTheme, setChoosedTheme] = React.useState(themes[2])
	const [isAwaitChoice, setIsAwaitChoice] = React.useState(false)
	const [isDealerTurn, setIsDealerTurn] = React.useState(false)
	const [resultMessage, setResultMessage] = React.useState<string | null>(null)
	const [activeHandIndex, setActiveHandIndex] = React.useState<0 | 1>(0)
	const [isActionBlocked, setIsActionBlocked] = React.useState(false)
	const [selectedActions, setSelectedActions] = React.useState<ActionType[]>([])
	const isInteractionLocked = isDealerTurn || isActionBlocked

	const {
		playerCards,
		secondHandCards,
		dealerCards,
		opponentCards,
		setPlayerCards,
		setSecondHandCards,
		setDealerCards,
		addPlayerCard,
		resetAll,
	} = useSimulatorStore()

	const themeImageSource = isAwaitChoice
		? require('@assets/simulator_themes_place.png')
		: require('@assets/simulator_theme_place.png')

	const actionButtonsPaths = {
		regular: require('@assets/buttons/action_button_small.png'),
		clicked: require('@assets/buttons/action_button_small_clicked.png'),
	}

	const handlePress = async (action: string) => {
		if (isActionBlocked || resultMessage) return
		const allUsedCards = [
			...playerCards,
			...secondHandCards,
			...dealerCards,
			...opponentCards,
		]

		const playDealerTurn = async (currentPlayerHand: PlayingCardType[]) => {
			let used = [...allUsedCards, ...currentPlayerHand]
			let currentHand = [...dealerCards]
			let currentValue = getHandValue(currentHand)

			while (currentValue < 17) {
				await new Promise(resolve => setTimeout(resolve, 500))
				const newCard = generateRandomCard(used)
				currentHand.push(newCard)
				used.push(newCard)
				setDealerCards([...currentHand])
				currentValue = getHandValue(currentHand)
			}

			return currentHand
		}

		switch (action) {
			case 'HIT': {
				const newCard = generateRandomCard(allUsedCards)
				if (secondHandCards.length > 0) {
					activeHandIndex === 0
						? setPlayerCards([...playerCards, newCard])
						: setSecondHandCards([...secondHandCards, newCard])
				} else {
					addPlayerCard(newCard)
				}
				setSelectedActions([...selectedActions, action])
				break
			}
			case 'DOUBLE': {
				setIsActionBlocked(true)
				const newCard = generateRandomCard(allUsedCards)
				if (secondHandCards.length > 0) {
					if (activeHandIndex === 0) {
						const updated = [...playerCards, newCard]
						setPlayerCards(updated)
						setActiveHandIndex(1)
						setIsActionBlocked(false)
					} else {
						const updated = [...secondHandCards, newCard]
						setSecondHandCards(updated)
						setIsDealerTurn(true)
						const dealerFinal = await playDealerTurn(updated)
						setIsDealerTurn(false)

						const result1 = getWinner(playerCards, dealerFinal)
						const result2 = getWinner(updated, dealerFinal)

						setResultMessage(`${result1} / ${result2}`)
					}
				} else {
					const updated = [...playerCards, newCard]
					setPlayerCards(updated)
					setIsDealerTurn(true)
					const dealerFinal = await playDealerTurn(updated)
					setIsDealerTurn(false)

					const result = getWinner(updated, dealerFinal)

					setResultMessage(`${result}`)
					setIsActionBlocked(false)
				}
				setSelectedActions([...selectedActions, action])
				break
			}
			case 'STAND': {
				setIsActionBlocked(true)
				if (secondHandCards.length > 0 && activeHandIndex === 0) {
					setActiveHandIndex(1)
					setIsActionBlocked(false)
				} else {
					setIsDealerTurn(true)
					const currentHand =
						secondHandCards.length > 0 ? secondHandCards : playerCards
					const dealerFinal = await playDealerTurn(currentHand)
					setIsDealerTurn(false)

					const result1 = getWinner(playerCards, dealerFinal)
					const result2 = secondHandCards.length
						? getWinner(secondHandCards, dealerFinal)
						: null

					setSelectedActions([...selectedActions, action])
					const output = secondHandCards.length
						? `${result1} / ${result2}`
						: `${result1}`

					setResultMessage(output)
					const result = simulationResults(output)
					if (result) {
						saveSimulationToUserProfile(result)
					}
					setIsActionBlocked(false)
				}
				break
			}
			case 'SPLIT': {
				if (
					playerCards.length !== 2 ||
					playerCards[0].value !== playerCards[1].value
				) {
					setResultMessage('Cannot split — cards must be the same')
					return
				}
				setSelectedActions([...selectedActions, action])
				const firstNew = generateRandomCard(allUsedCards)
				const secondNew = generateRandomCard([...allUsedCards, firstNew])
				setPlayerCards([playerCards[0], firstNew])
				setSecondHandCards([playerCards[1], secondNew])
				setActiveHandIndex(0)
				break
			}
		}
	}

	const simulationResults = (
		outputResult: string
	): SimulationResult | undefined => {
		const resultMap: Record<string, 'win' | 'lose' | 'draw'> = {
			'Player wins': 'win',
			'Dealer Busts — Player Wins': 'win',
			'Dealer wins': 'lose',
			'Player Busts — Dealer Wins': 'lose',
			Draw: 'draw',
		}

		const simulationResult = resultMap[outputResult ?? '']
		if (!simulationResult) return undefined

		return {
			createAt: new Date().toISOString(),
			playerCards,
			secondHand: secondHandCards || null,
			opponentCars: opponentCards,
			dealerCards: dealerCards,
			selectedActions: selectedActions,
			simulationResult,
		}
	}

	React.useEffect(() => {
		if (resultMessage === 'Cannot split — cards must be the same') {
			const timer = setTimeout(() => {
				setResultMessage(null)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [resultMessage])

	//? When "TRY AGAIN" or "BACK" is pressed
	const resetGame = () => {
		resetAll()
		setResultMessage(null)
		setSecondHandCards([])
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@assets/main_bg.png')}
				style={styles.backgroundImage}
			/>
			{/* Кнопка назад */}
			<View style={styles.header}>
				<BackButton propsFn={resetGame} />
			</View>

			{/* Заголовок страницы */}
			<View style={styles.headerText}>
				<Text
					style={[
						TYPOGRAPHY.H2,
						{ width: 248, textAlign: 'center', marginBottom: 35 },
					]}
				>
					BlackJack Hand Simulator
				</Text>
			</View>

			<View>
				{isAwaitChoice ? (
					<ImageBackground
						key={isAwaitChoice ? 'themes' : 'theme'}
						source={themeImageSource}
						resizeMode='contain'
						style={isAwaitChoice ? styles.themesBgImage : styles.themeBgImage}
					>
						<Pressable onPress={() => setIsAwaitChoice(false)}>
							<Text style={[TYPOGRAPHY.H12, { marginTop: 5 }]}>
								{choosedTheme}
							</Text>
						</Pressable>
						{themes.map(item => {
							return (
								<Pressable
									key={item}
									style={{ height: 45 }}
									onPress={() => {
										setChoosedTheme(item)
										setIsAwaitChoice(false)
									}}
								>
									<Text style={[TYPOGRAPHY.H11, { color: '#0084FF' }]}>
										{item}
									</Text>
								</Pressable>
							)
						})}
					</ImageBackground>
				) : (
					<ImageBackground
						key={isAwaitChoice ? 'themes' : 'theme'}
						source={themeImageSource}
						resizeMode='contain'
						style={isAwaitChoice ? styles.themesBgImage : styles.themeBgImage}
					>
						<Text style={[TYPOGRAPHY.H12, { marginTop: 5 }]}>
							{choosedTheme}
						</Text>
						<Pressable
							style={styles.editIcon}
							onPress={() => setIsAwaitChoice(true)}
						>
							{({ pressed }) => (
								<Image
									source={
										pressed
											? require('@assets/edit_icon_clicked.png')
											: require('@assets/edit_icon.png')
									}
								/>
							)}
						</Pressable>
					</ImageBackground>
				)}
			</View>

			{/* Секция игрового стола */}
			<View style={styles.tableContainer}>
				<ImageBackground
					source={require('@assets/table.png')}
					style={styles.tableImage}
				></ImageBackground>
				<View style={styles.opponentCardsContainer}>
					{opponentCards.map((card, index) => (
						<AnimatedCard
							key={`${card.value}_${card.suit}_${index}`}
							style={
								index % 2 === 0
									? { marginRight: -20 }
									: { marginRight: -20, marginTop: -5 }
							}
							source={CARD_SUIT_PATH}
						/>
					))}
				</View>

				<View style={styles.tableCard}>
					<Image source={CARD_SUIT_PATH} />
				</View>

				<View style={styles.dealerCardsContainer}>
					<RenderCards cards={dealerCards} style={{ marginRight: 0 }} />
				</View>

				<View
					style={[
						styles.playerCardsContainer,
						secondHandCards.length > 0 && activeHandIndex === 0
							? {
									left: width * 0.1,
									borderWidth: 2,
									borderColor: '#FFD700',
									borderRadius: 8,
									padding: 5,
							  }
							: activeHandIndex === 1
							? { left: width * 0.1 }
							: null,
					]}
				>
					<RenderCards cards={playerCards} />
				</View>

				{/* Дополнительные карты */}
				{secondHandCards.length > 0 && (
					<View
						style={[
							styles.playerCardsContainer,
							{ left: width * 0.6 },
							activeHandIndex === 1
								? {
										borderWidth: 2,
										borderColor: '#FFD700',
										borderRadius: 8,
										padding: 5,
								  }
								: null,
						]}
					>
						<RenderCards cards={secondHandCards} />
					</View>
				)}
			</View>

			{/* Секция кнопок действий */}
			<View style={styles.actionButtonsContainer}>
				<ActionButton
					disable={isInteractionLocked}
					image={actionButtonsPaths.regular}
					clicked={actionButtonsPaths.clicked}
					onPress={() => handlePress('HIT')}
					title='HIT'
					textStyle={TYPOGRAPHY.H29}
				/>
				<ActionButton
					disable={isInteractionLocked || playerCards.length === 0}
					image={actionButtonsPaths.regular}
					clicked={actionButtonsPaths.clicked}
					onPress={() => {
						handlePress('STAND')
					}}
					title='STAND'
					textStyle={TYPOGRAPHY.H29}
				/>
				<ActionButton
					disable={isInteractionLocked || playerCards.length === 0}
					image={actionButtonsPaths.regular}
					clicked={actionButtonsPaths.clicked}
					onPress={() => handlePress('DOUBLE')}
					title='DOUBLE'
					textStyle={TYPOGRAPHY.H29}
				/>
				<ActionButton
					disable={isInteractionLocked || playerCards.length === 0}
					image={actionButtonsPaths.regular}
					clicked={actionButtonsPaths.clicked}
					onPress={() => handlePress('SPLIT')}
					title='SPLIT'
					textStyle={TYPOGRAPHY.H29}
				/>
			</View>

			{/* Секция с результатами */}
			{resultMessage && (
				<View
					style={{
						position: 'absolute',
						bottom: 120,
						alignItems: 'center',
						width,
					}}
				>
					<Text
						style={[TYPOGRAPHY.H24, { color: '#FFD700', textAlign: 'center' }]}
					>
						{resultMessage}
					</Text>
				</View>
			)}

			{/* Секция с кнопкой сброса */}
			<View style={styles.primaryButtonContainer}>
				<Pressable
					disabled={isDealerTurn}
					style={
						isDealerTurn
							? [styles.primaryButton, { opacity: 0.5 }]
							: styles.primaryButton
					}
					onPress={() => resetGame()}
				>
					{({ pressed }) => (
						<>
							<Image
								source={
									pressed
										? require('@assets/buttons/button_s_clicked.png')
										: require('@assets/buttons/button_s.png')
								}
							/>
							<Text style={[TYPOGRAPHY.H34, styles.startBtn]}>Try again</Text>
						</>
					)}
				</Pressable>
			</View>
		</View>
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
	themeBgImage: {
		alignSelf: 'center',
		width: 300,
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'relative',
	},
	themesBgImage: {
		height: 240,
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 2,
	},
	editIcon: {
		position: 'absolute',
		right: 10,
		bottom: 7,
		width: 44,
		height: 44,
	},
	tableContainer: {
		position: 'absolute',
		top: height * 0.33,
		zIndex: 0,
	},
	tableImage: {
		height: height * 0.4,
		width: width,
	},
	opponentCardsContainer: {
		position: 'absolute',
		flexDirection: 'row',
		top: -20,
		left: width * 0.3,
		zIndex: 0,
	},
	tableCard: {
		position: 'absolute',
		top: 60,
		left: 10,
		transform: [{ rotate: '90deg' }],
	},
	dealerCardsContainer: {
		position: 'absolute',
		flexDirection: 'row',
		top: 150,
		left: width * 0.1,
		zIndex: 0,
	},
	playerCardsContainer: {
		position: 'absolute',
		flexDirection: 'row',
		bottom: 0,
		left: width * 0.3,
		zIndex: 0,
	},
	actionButtonsContainer: {
		position: 'absolute',
		width: width,
		flexDirection: 'row',
		justifyContent: 'space-around',
		bottom: 180,
	},
	primaryButtonContainer: {
		position: 'absolute',
		bottom: 50,
		width: width,
		alignItems: 'center',
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	startBtn: {
		position: 'absolute',
		top: 20,
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
})

export default HandSimulatorScreen
