import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path, Line as SvgLine } from 'react-native-svg'
import { TYPOGRAPHY } from '../constants/typography'

interface ChartDataPoint {
	x: string
	y: number
	color?: string
}

interface ProgressChartProps {
	title: string
	data: ChartDataPoint[]
	dateRange: string
	chartType: 'winLose' | 'strategy'
}

const { width } = Dimensions.get('window')

const ProgressChart: React.FC<ProgressChartProps> = ({
	title,
	data,
	dateRange,
	chartType,
}) => {
	// Функция для создания пути SVG на основе данных
	const createPath = (data: ChartDataPoint[]) => {
		if (data.length === 0) return ''

		const chartWidth = width * 0.8 - 40 // Ширина графика с учетом отступов
		const chartHeight = 150 // Высота графика

		// Находим минимальное и максимальное значения для масштабирования
		const minY = Math.min(...data.map(d => d.y))
		const maxY = Math.max(...data.map(d => d.y))
		const range = maxY - minY || 1 // Избегаем деления на ноль

		// Создаем точки для пути
		const points = data.map((point, index) => {
			const x = (index / (data.length - 1)) * chartWidth
			const y = chartHeight - ((point.y - minY) / range) * chartHeight
			return { x, y }
		})

		// Создаем SVG path
		let path = `M ${points[0].x} ${points[0].y}`

		// Добавляем кривую Безье для плавности
		for (let i = 0; i < points.length - 1; i++) {
			const current = points[i]
			const next = points[i + 1]

			// Контрольные точки для кривой Безье
			const cp1x = current.x + (next.x - current.x) / 3
			const cp1y = current.y
			const cp2x = next.x - (next.x - current.x) / 3
			const cp2y = next.y

			path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
		}

		return path
	}

	// Создаем точки для графика
	const renderPoints = () => {
		const chartWidth = width * 0.8 - 40
		const chartHeight = 150

		const minY = Math.min(...data.map(d => d.y))
		const maxY = Math.max(...data.map(d => d.y))
		const range = maxY - minY || 1

		return data.map((point, index) => {
			const x = (index / (data.length - 1)) * chartWidth
			const y = chartHeight - ((point.y - minY) / range) * chartHeight

			const pointColor =
				chartType === 'winLose'
					? point.y > 0.5
						? '#4CAF50'
						: '#F44336'
					: '#B39DDB'

			return <Circle key={index} cx={x} cy={y} r={5} fill={pointColor} />
		})
	}

	// Создаем горизонтальные линии сетки
	const renderGrid = () => {
		const chartHeight = 150
		const lines = []

		for (let i = 0; i <= 4; i++) {
			const y = (i / 4) * chartHeight
			lines.push(
				<SvgLine
					key={i}
					x1={0}
					y1={y}
					x2={width * 0.8 - 40}
					y2={y}
					stroke='#E0E0E0'
					strokeWidth={1}
				/>
			)
		}

		return lines
	}

	// Создаем метки оси Y
	const renderYLabels = () => {
		const chartHeight = 150
		const minY = Math.min(...data.map(d => d.y))
		const maxY = Math.max(...data.map(d => d.y))
		const range = maxY - minY || 1

		const labels = []

		for (let i = 0; i <= 4; i++) {
			const value = minY + (range * (4 - i)) / 4
			const y = (i / 4) * chartHeight

			labels.push(
				<Text key={i} style={[styles.yAxisLabel, { top: y - 10 }]}>
					{value.toFixed(1)}
				</Text>
			)
		}

		return labels
	}

	const lineColor = chartType === 'winLose' ? '#8BC34A' : '#B39DDB'
	const path = createPath(data)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.dateContainer}>
					<Text style={[TYPOGRAPHY.H19, styles.dateText]}>{dateRange}</Text>
					<Image source={require('../../assets/icon_calendar.png')} />
				</View>
			</View>

			<View style={styles.chartContainer}>
				<View style={styles.yAxisContainer}>{renderYLabels()}</View>

				<View style={styles.chartArea}>
					<Svg height={150} width={width * 0.8 - 40}>
						{renderGrid()}
						<Path d={path} stroke={lineColor} strokeWidth={3} fill='none' />
						{renderPoints()}
					</Svg>

					<View style={styles.xAxisContainer}>
						{data.map((item, index) => (
							<Text key={index} style={styles.xAxisLabel}>
								{item.x}
							</Text>
						))}
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		padding: 15,
		marginBottom: 10,
		borderRadius: 10,
		width: width * 0.9,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		opacity: 0.9,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#0084FF',
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dateText: {
		marginRight: 5,
	},
	chartContainer: {
		height: 200,
		flexDirection: 'row',
		alignItems: 'center',
	},
	yAxisContainer: {
		width: 40,
		height: 150,
		justifyContent: 'space-between',
		position: 'relative',
	},
	yAxisLabel: {
		fontSize: 10,
		color: '#666',
		position: 'absolute',
		right: 5,
	},
	chartArea: {
		flex: 1,
	},
	xAxisContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 5,
	},
	xAxisLabel: {
		fontSize: 10,
		color: '#666',
		textAlign: 'center',
	},
})

export default ProgressChart
