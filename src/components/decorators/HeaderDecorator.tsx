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
	// Calculate coordinates for a gradient based on an angle
	const calculateGradientCoords = (angle: number) => {
		// Converting an angle to radians
		const radians = (angle * Math.PI) / 180

		// Calculate the coordinates of the beginning and end of the gradient
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
					{/* Define a gradient */}
					<SvgGradient id={gradientId} {...gradientCoords}>
						{gradientColors.map((color, index) => (
							<Stop
								key={index}
								offset={index / (gradientColors.length - 1)}
								stopColor={color}
							/>
						))}
					</SvgGradient>

					{/* Create a mask from the text */}
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

				{/* Rectangle with a gradient, cut to the shape of the text */}
				<Rect
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill={`url(#${gradientId})`}
					mask={`url(#${maskId})`}
				/>

				{/* The text to create the outline effect */}
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
