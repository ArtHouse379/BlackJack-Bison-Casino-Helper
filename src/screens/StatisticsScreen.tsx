import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import {
	Dimensions,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import BackButton from '../components/buttons/BackButton'
import ProgressChart from '../components/ProgressChart'
import StatisticsCard from '../components/StatisticsCard'
import ViewReportButton from '../components/ViewReportButton'
import { TYPOGRAPHY } from '../constants/typography'

const { width, height } = Dimensions.get('window')

// Тестовые данные для графиков
const winLoseData = [
	{ x: '02', y: 0.3, color: 'red' },
	{ x: '03', y: 0.8, color: 'green' },
	{ x: '04', y: 0.9, color: 'green' },
	{ x: '05', y: 0.7, color: 'green' },
	{ x: '06', y: 0.5, color: 'green' },
	{ x: '07', y: 0.2, color: 'red' },
	{ x: '08', y: 0.3, color: 'red' },
]

const strategyData = [
	{ x: '4', y: 1 },
	{ x: '5', y: 2 },
	{ x: 'b', y: 4 },
	{ x: '7', y: 1.5 },
	{ x: '8', y: 3 },
	{ x: '9', y: 2 },
	{ x: '22', y: 4 },
	{ x: '23', y: 1 },
]

const StatisticsScreen: React.FC = () => {
	const [userData, setUserData] = React.useState<any>(null)
	const [handsPlayed, setHandsPlayed] = React.useState<number>(0)
	const [winRate, setWinRate] = React.useState<number>(0)
	const [optimalMoves, setOptimalMoves] = React.useState<number>(0)
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
			const wins = userData?.simulationsHistory?.filter(
				(simulation: any) => simulation.simulationResult === 'win'
			).length
			const winRate = Number(((wins / simulationsPlayed) * 100).toFixed(2))
			setHandsPlayed(simulationsPlayed)
			setWinRate(winRate)
			// Аналогично для optimalMoves, если потребуется
		}
	}, [userData])

	const handleViewFullReport = () => {
		console.log('View full report pressed')
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/main_bg.png')}
				style={styles.background}
			/>

			{/* Заголовок страницы */}
			<View style={styles.header}>
				<BackButton />
			</View>

			{/* Заголовок страницы */}
			<View style={styles.headerText}>
				<Text style={TYPOGRAPHY.H2}>STATISTICS</Text>
				<Text style={TYPOGRAPHY.H2}>& PROGRESS</Text>
			</View>

			{/* Содержимое страницы */}
			<ScrollView style={styles.scrollContainer}>
				<StatisticsCard
					title='HAND HISTORY'
					items={[
						{ label: 'HANDS PLAYED', value: `${handsPlayed}` },
						{ label: 'WIN RATE', value: `${winRate || 0}%` },
						{ label: 'OPTIMAL MOVES', value: `${optimalMoves || 32.5}%` },
					]}
				/>

				{/* График соотношения побед/поражений */}
				<ProgressChart
					title='WIN/LOSE RATIO'
					data={winLoseData}
					dateRange='01.02-30.08.24'
					chartType='winLose'
				/>

				{/* График правильных стратегических решений */}
				<ProgressChart
					title='CORRECT STRATEGY DECISIONS'
					data={strategyData}
					dateRange='12.01.2025'
					chartType='strategy'
				/>
			</ScrollView>

			{/* Кнопка просмотра полного отчета */}
			<ViewReportButton
				title='VIEW FULL REPORT'
				onPress={handleViewFullReport}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		marginBottom: 100,
		overflow: 'visible',
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
})

export default StatisticsScreen
