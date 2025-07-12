import { TYPOGRAPHY } from '@/constants/typography'
import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text } from 'react-native'

interface ActionButtonProps {
	disable?: boolean
	active?: boolean
	title: string
	image: number | { uri: string }
	clicked: number | { uri: string }
	onPress: () => void
	textStyle?: object
}

const { width } = Dimensions.get('window')

const ActionButton: React.FC<ActionButtonProps> = ({
	disable,
	active = false,
	title,
	image,
	clicked,
	onPress,
	textStyle,
}) => {
	return (
		<Pressable
			disabled={disable}
			style={[styles.primaryButton, disable ? { opacity: 0.5 } : null]}
			onPress={onPress}
		>
			{({ pressed }) => (
				<>
					<Image source={pressed || active ? clicked : image} />
					<Text style={[TYPOGRAPHY.H30, styles.startBtn, textStyle]}>
						{title}
					</Text>
				</>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	startBtn: {
		position: 'absolute',
		top: 15,
	},
})

export default ActionButton
