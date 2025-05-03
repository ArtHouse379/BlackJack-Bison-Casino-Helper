import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, {
	Defs,
	Mask,
	Rect,
	Stop,
	LinearGradient as SvgGradient,
	Text,
} from 'react-native-svg'

interface HeaderDecoratorProps {
	text: string
	fontSize?: number
	fontWeight?: string
	gradientColors?: readonly [string, string, ...string[]]
	gradientAngle?: number
}

const HeaderDecorator: React.FC<HeaderDecoratorProps> = ({
	text,
	fontSize = 24,
	fontWeight = 'bold',
	gradientColors = ['#76BDFF', '#FF00BF'],
	gradientAngle = 45,
}) => {
	// Расчет координат для градиента на основе угла
	const calculateGradientCoords = (angle: number) => {
		// Преобразуем угол в радианы
		const radians = (angle * Math.PI) / 180

		// Вычисляем координаты начала и конца градиента
		return {
			x1: '0%',
			y1: '0%',
			x2: Math.cos(radians) * 100 + '%',
			y2: Math.sin(radians) * 100 + '%',
		}
	}

	const gradientCoords = calculateGradientCoords(gradientAngle)
	const gradientId = 'headerGradient'
	const maskId = 'textMask'

	return (
		<View style={styles.container}>
			<Svg height={fontSize * 1.5} width='100%'>
				<Defs>
					{/* Определение градиента */}
					<SvgGradient id={gradientId} {...gradientCoords}>
						{gradientColors.map((color, index) => (
							<Stop
								key={index}
								offset={index / (gradientColors.length - 1)}
								stopColor={color}
							/>
						))}
					</SvgGradient>

					{/* Создание маски из текста */}
					<Mask id={maskId}>
						<Rect x='0' y='0' width='100%' height='100%' fill='white' />
						<Text
							x='50%'
							y='50%'
							fontSize={fontSize}
							fontWeight={fontWeight}
							textAnchor='middle'
							alignmentBaseline='central'
							fill='black'
						>
							{text}
						</Text>
					</Mask>
				</Defs>

				{/* Прямоугольник с градиентом, обрезанный по форме текста */}
				<Rect
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill={`url(#${gradientId})`}
					mask={`url(#${maskId})`}
				/>

				{/* Сам текст для создания эффекта обводки */}
				<Text
					x='50%'
					y='50%'
					fontSize={fontSize - 2}
					fontWeight={fontWeight}
					textAnchor='middle'
					alignmentBaseline='central'
					fill='white'
					stroke='none'
				>
					{text}
				</Text>
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default HeaderDecorator
