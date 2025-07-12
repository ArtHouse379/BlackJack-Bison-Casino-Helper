import { TYPOGRAPHY } from '@/constants/typography'
import React from 'react'
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native'

interface StatisticsItem {
	label: string
	value: string
}

interface StatisticsCardProps {
	title: string
	items: StatisticsItem[]
}

const { width } = Dimensions.get('window')

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, items }) => {
	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.bgImage}
				source={require('@assets/hand_history_panel.png')}
				resizeMode='cover'
			>
				<Text style={[TYPOGRAPHY.H15, styles.title]}>{title}</Text>
				{items.map((item, index) => (
					<Text key={index} style={[TYPOGRAPHY.H16, styles.itemText]}>
						• {item.label}: {item.value}
					</Text>
				))}
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	bgImage: {
		width: 350,
		height: 200,
		justifyContent: 'flex-start',
		paddingTop: 15,
	},
	title: {
		marginBottom: 15,
		textAlign: 'center',
	},
	itemText: {
		marginLeft: 35,
		marginBottom: 10,
	},
})

export default StatisticsCard
