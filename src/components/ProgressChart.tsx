import { TYPOGRAPHY } from '@/constants/typography'
import DateTimePicker from '@react-native-community/datetimepicker'
import React from 'react'
import {
	Dimensions,
	Image,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Svg, { Circle, Path, Line as SvgLine } from 'react-native-svg'

interface ChartDataPoint {
	x: string // date format YYYY-MM-DDT00-00-00
	y: number
	color?: string
}

interface ProgressChartProps {
	title: string
	data: ChartDataPoint[]
}

const { width } = Dimensions.get('window')

const ProgressChart: React.FC<ProgressChartProps> = ({ title, data }) => {
	const [calendarVisible, setCalendarVisible] = React.useState<
		'start' | 'end' | null
	>(null)
	const [startDate, setStartDate] = React.useState<Date | null>(() => {
		const now = new Date()
		now.setDate(now.getDate() - 5)
		return now
	})
	const [endDate, setEndDate] = React.useState<Date>(new Date())
	const [filteredData, setFilteredData] = React.useState<ChartDataPoint[]>(data)

	React.useEffect(() => {
		if (startDate && endDate) {
			const startDay = startDate.toISOString().slice(0, 10)
			const endDay = endDate.toISOString().slice(0, 10)
			const filtered = data.filter(point => {
				const pointDay = new Date(point.x).toISOString().slice(0, 10)
				return pointDay >= startDay && pointDay <= endDay
			})
			setFilteredData(filtered.length > 0 ? filtered : [])
		} else {
			setFilteredData(data)
		}
	}, [startDate, endDate, data])

	const handleCalendarPress = (type: 'start' | 'end') => {
		setCalendarVisible(type)
	}

	const handleDateChange = (event: any, date?: Date) => {
		if (calendarVisible === 'start' && date) setStartDate(date)
		if (calendarVisible === 'end' && date) setEndDate(date)
		setCalendarVisible(null)
	}

	// YAxis: always 5 steps, maximum 5 or more if there are values greater than 5
	const getYAxisRange = (data: ChartDataPoint[]) => {
		const maxYData = Math.max(0, ...data.map(d => d.y))
		const maxY = maxYData > 5 ? Math.ceil(maxYData) : 5
		return {
			min: 0,
			max: maxY,
		}
	}

	const padding = 15
	const chartWidth = width * 0.8 - 2 * padding
	const chartHeight = 150 - 2 * padding
	const yAxisSteps = 5 // always 5 steps

	const yRange = getYAxisRange(filteredData)
	const yStep = (yRange.max - yRange.min) / yAxisSteps

	const renderPoints = (data: ChartDataPoint[]) => {
		if (data.length === 0) return null
		return data.map((point, index) => {
			const x = padding + (index / Math.max(1, data.length - 1)) * chartWidth
			const y =
				padding +
				((yRange.max - point.y) / Math.max(1, yRange.max - yRange.min)) *
					chartHeight
			return (
				<React.Fragment key={index}>
					<Circle cx={x} cy={y} r={12} fill={point.color || '#79FF48'} />
					{/* Intersection lines */}
					<SvgLine
						x1={x}
						y1={y}
						x2={x}
						y2={padding + chartHeight}
						stroke='#BDBDBD'
						strokeDasharray='2,2'
						strokeWidth={1}
					/>
					<SvgLine
						x1={padding}
						y1={y}
						x2={x}
						y2={y}
						stroke='#BDBDBD'
						strokeDasharray='2,2'
						strokeWidth={1}
					/>
				</React.Fragment>
			)
		})
	}

	const renderGrid = () => {
		const lines = []
		for (let i = 0; i <= yAxisSteps; i++) {
			const value = yRange.max - yStep * i
			const y =
				padding +
				((yRange.max - value) / Math.max(1, yRange.max - yRange.min)) *
					chartHeight
			lines.push(
				<SvgLine
					key={i}
					x1={0}
					y1={y}
					x2={chartWidth}
					y2={y}
					stroke='#E0E0E0'
					strokeWidth={1}
				/>
			)
		}
		return lines
	}

	const renderYLabels = (data: ChartDataPoint[]) => {
		const labels = []
		for (let i = 0; i <= yAxisSteps; i++) {
			const value = yRange.max - yStep * i
			const y =
				padding +
				((yRange.max - value) / Math.max(1, yRange.max - yRange.min)) *
					chartHeight
			labels.push(
				<Text key={i} style={[styles.yAxisLabel, { top: y - 10 }]}>
					{Math.round(value)}
				</Text>
			)
		}
		return labels
	}

	const renderColoredSmoothPath = (data: ChartDataPoint[]) => {
		if (data.length < 2) return null
		const points = data.map((point, index) => {
			const x = padding + (index / Math.max(1, data.length - 1)) * chartWidth
			const y =
				padding +
				((yRange.max - point.y) / Math.max(1, yRange.max - yRange.min)) *
					chartHeight
			return { x, y }
		})
		const segments = []
		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i]
			const p1 = points[i + 1]
			const cp1x = p0.x + (p1.x - p0.x) / 2
			const cp1y = p0.y
			const cp2x = p0.x + (p1.x - p0.x) / 2
			const cp2y = p1.y
			const color = p1.y < p0.y ? '#79FF48' : '#EF644C' // up - green, down - red
			const d = `M ${p0.x} ${p0.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
			segments.push(
				<Path key={i} d={d} stroke={color} strokeWidth={4} fill='none' />
			)
		}
		return segments
	}

	const getDatesInRange = (start: Date, end: Date) => {
		const dates = []
		const current = new Date(start)
		while (
			current.toISOString().slice(0, 10) <= end.toISOString().slice(0, 10)
		) {
			dates.push(new Date(current))
			current.setDate(current.getDate() + 1)
		}

		return dates
	}

	// Hook to pad data with zeros for all days in a range
	const getFilledData = React.useCallback(() => {
		if (!startDate || !endDate) return data
		const dates = getDatesInRange(startDate, endDate)
		return dates.map(date => {
			const dayStr = date.toISOString().slice(0, 10)
			const found = data.find(point => point.x.slice(0, 10) === dayStr)
			return found ? found : { x: dayStr, y: 0, color: '#EF644C' }
		})
	}, [data, startDate, endDate])

	React.useEffect(() => {
		setFilteredData(getFilledData())
	}, [startDate, endDate, data, getFilledData])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.dateContainer}>
					<TouchableOpacity onPress={() => handleCalendarPress('start')}>
						<Text style={[TYPOGRAPHY.H19, styles.dateText]}>
							{startDate ? startDate.toLocaleDateString() : 'from ...'}
						</Text>
					</TouchableOpacity>
					<Text style={{ marginHorizontal: 2 }}>-</Text>
					<TouchableOpacity onPress={() => handleCalendarPress('end')}>
						<Text style={[TYPOGRAPHY.H19, styles.dateText]}>
							{endDate ? endDate.toLocaleDateString() : '... to'}
						</Text>
					</TouchableOpacity>
					<Image
						resizeMode='contain'
						source={require('@assets/icon_calendar.png')}
					/>
				</View>
			</View>

			{filteredData.length === 0 ? (
				<View
					style={{
						height: 150,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ color: '#888', fontSize: 16 }}>No data</Text>
				</View>
			) : (
				<View style={styles.chartContainer}>
					<View
						style={[
							styles.yAxisContainer,
							{ height: chartHeight + 2 * padding },
						]}
					>
						{renderYLabels(filteredData)}
					</View>
					<View style={styles.chartArea}>
						<Svg
							height={chartHeight + 2 * padding}
							width={chartWidth + 2 * padding}
						>
							{renderGrid()}
							{renderColoredSmoothPath(filteredData)}
							{renderPoints(filteredData)}
						</Svg>
						<View style={styles.xAxisContainer}>
							{(() => {
								if (!startDate || !endDate) return null
								const dates = getDatesInRange(startDate, endDate)
								return dates.map((date, idx) => {
									const day = date.getDate().toString().padStart(2, '0')
									const month = (date.getMonth() + 1)
										.toString()
										.padStart(2, '0')
									return (
										<Text key={idx} style={styles.xAxisLabel}>
											{day}.{month}
										</Text>
									)
								})
							})()}
						</View>
					</View>
				</View>
			)}
			{calendarVisible && (
				<Modal transparent visible={!!calendarVisible} animationType='fade'>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#00000055',
						}}
					>
						<View
							style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}
						>
							<DateTimePicker
								value={
									calendarVisible === 'start'
										? startDate || new Date()
										: endDate || new Date()
								}
								mode='date'
								display={Platform.OS === 'ios' ? 'spinner' : 'default'}
								onChange={handleDateChange}
							/>
						</View>
					</View>
				</Modal>
			)}
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
		maxWidth: 200,
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dateText: {
		marginRight: 5,
	},
	chartContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	yAxisContainer: {
		width: 15,
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
