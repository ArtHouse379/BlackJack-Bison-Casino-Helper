import React, { useState } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { TYPOGRAPHY } from '../../constants/typography'

interface StrategyGuidesListProps {
	list: { title: string; text: string }[]
}

const StrategyGuidesList: React.FC<StrategyGuidesListProps> = ({ list }) => {
	const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
		{}
	)

	const toggleExpand = (title: string) => {
		setExpandedItems(prev => ({
			...prev,
			[title]: !prev[title],
		}))
	}

	const truncateText = (text: string, maxLength = 150) => {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength).trim() + '...'
	}

	return (
		<View style={styles.content}>
			<FlatList
				data={list}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={[TYPOGRAPHY.H7, styles.sectionTitle]}>
							{item.title}
						</Text>
						<Text style={TYPOGRAPHY.H8}>
							{expandedItems[item.title] ? item.text : truncateText(item.text)}
						</Text>
						<TouchableOpacity onPress={() => toggleExpand(item.title)}>
							<Text style={[TYPOGRAPHY.H8, styles.openAll]}>
								{expandedItems[item.title] ? 'Show Less' : 'Open All'}
							</Text>
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={item => item.title}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	content: { marginTop: 15, flex: 1 },
	section: {
		backgroundColor: '#007BFF',
		opacity: 0.8,
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
	},
	sectionTitle: { textAlign: 'center' },
	openAll: {
		textDecorationLine: 'underline',
		textAlign: 'right',
		marginTop: 5,
	},
})
export default StrategyGuidesList
