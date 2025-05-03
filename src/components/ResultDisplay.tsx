import { TYPOGRAPHY } from '@/constants/typography'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

interface ResultDisplayProps {
	percentage: number
}

const { width } = Dimensions.get('window')

const ResultDisplay: React.FC<ResultDisplayProps> = ({ percentage }) => {
	return (
		<View style={styles.container}>
			<Text style={[TYPOGRAPHY.H14, styles.text]}>
				WINNING HAND: {(percentage * 100).toFixed(2)}%
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#052C66',
		width: 300,
		height: 80,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		textAlign: 'center',
	},
})

export default ResultDisplay
