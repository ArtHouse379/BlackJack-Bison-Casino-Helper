import BackButton from '@/components/buttons/BackButton'
import ProgressChart from '@/components/ProgressChart'
import StatisticsCard from '@/components/StatisticsCard'
import ViewReportButton from '@/components/ViewReportButton'
import { SimulationResult } from '@/types/SimulationResult'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ChartDataPoint = {
	x: string
	y: number
	color?: string
}

const StatisticsScreen: React.FC = () => {
	const [userData, setUserData] = React.useState<any>(null)
	const [handsPlayed, setHandsPlayed] = React.useState<number>(0)
	const [winRate, setWinRate] = React.useState<number>(0)
	const [optimalMoves, setOptimalMoves] = React.useState<number>(0)
	const [winLoseChartData, setWinLoseChartData] = React.useState<
		ChartDataPoint[]
	>([])
	const [strategyChartData, setStrategyChartData] = React.useState<
		ChartDataPoint[]
	>([])
	const navigation = useNavigation()

	useEffect(() => {
		const loadProfile = async () => {
			const storedProfile = await AsyncStorage.getItem('userProfile')
			if (storedProfile) setUserData(JSON.parse(storedProfile))
		}
		loadProfile()
	}, [])

	useEffect(() => {
		const simulationsPlayed = userData?.simulationsHistory?.length ?? 0
		if (simulationsPlayed > 0) {
			const wins = userData.simulationsHistory.filter(
				(simulation: any) => simulation.simulationResult === 'win'
			).length
			const winRate = Number(((wins / simulationsPlayed) * 100).toFixed(2))
			setHandsPlayed(simulationsPlayed)
			setWinRate(winRate)

			// Группировка по дням (только дата, без времени)
			const groupedByDay: Record<string, any[]> = {}
			userData.simulationsHistory.forEach((simulation: SimulationResult) => {
				const dateObj = new Date(simulation.createAt)
				const day = dateObj.toISOString().slice(0, 10) // YYYY-MM-DD
				if (!groupedByDay[day]) groupedByDay[day] = []
				groupedByDay[day].push(simulation)
			})

			// WIN/LOSE CHART DATA: количество побед по дням
			const winLoseData = Object.entries(groupedByDay).map(([day, sims]) => {
				const winsCount = sims.filter(
					(sim: SimulationResult) => sim.simulationResult === 'win'
				).length
				return {
					x: day,
					y: winsCount,
					color: winsCount > 0 ? '#79FF48' : '#EF644C',
				}
			})
			setWinLoseChartData(winLoseData)

			// STRATEGY CHART DATA: количество правильных решений по дням
			const strategyData = Object.entries(groupedByDay).map(([day, sims]) => {
				const allMoves = sims.flatMap(
					(sim: SimulationResult) => sim.playerActionsEfficiency || []
				)
				const correctCount = allMoves.filter((m: boolean) => m).length
				return {
					x: day,
					y: correctCount,
				}
			})
			setStrategyChartData(strategyData)

			// OPTIMAL MOVES (общий процент)
			const allMoves = userData.simulationsHistory.flatMap(
				(simulation: SimulationResult) =>
					simulation.playerActionsEfficiency || []
			)
			const trueMoves = allMoves.filter((move: boolean) => move === true).length
			const optimalMovesPercent =
				allMoves.length > 0
					? Number(((trueMoves / allMoves.length) * 100).toFixed(2))
					: 0
			setOptimalMoves(optimalMovesPercent)
		}
	}, [userData])

	const handleViewFullReport = () => {
		navigation.navigate('Premium' as never)
	}

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.background}
			resizeMode='contain'
		>
			<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* Заголовок страницы */}
					<View style={styles.header}>
						<BackButton />
					</View>

					{/* Заголовок страницы */}
					<View style={styles.headerText}>
						<Image
							source={require('@assets/page_headers/statistic_header.png')}
							resizeMode='contain'
						/>
					</View>

					{/* Содержимое страницы */}
					<ScrollView style={styles.scrollContainer}>
						<StatisticsCard
							title='HAND HISTORY'
							items={[
								{ label: 'HANDS PLAYED', value: `${handsPlayed}` },
								{ label: 'WIN RATE', value: `${winRate || 0}%` },
								{ label: 'OPTIMAL MOVES', value: `${optimalMoves}%` },
							]}
						/>
						{/* График соотношения побед/поражений */}
						<ProgressChart title='WIN/LOSE RATIO' data={winLoseChartData} />
						<ProgressChart
							title='CORRECT STRATEGY DECISIONS'
							data={strategyChartData}
						/>
					</ScrollView>

					{/* Кнопка просмотра полного отчета */}
					<ViewReportButton
						title='VIEW FULL REPORT'
						onPress={handleViewFullReport}
					/>
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	scrollContainer: {
		marginBottom: 100,
		overflow: 'visible',
	},
	header: {
		alignItems: 'flex-start',
	},
	headerText: {
		alignItems: 'center',
		marginTop: -40,
	},
	background: {
		flex: 1,
	},
})

export default StatisticsScreen
