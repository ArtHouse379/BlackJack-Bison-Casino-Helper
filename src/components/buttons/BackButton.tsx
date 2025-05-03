import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

interface BackButtonProps {
	onPress?: () => void
	propsFn?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, propsFn }) => {
	const navigation = useNavigation()

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			propsFn && propsFn()
			navigation.goBack()
		}
	}

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			{({ pressed }) => (
				<Image
					source={
						pressed
							? require('../../../assets/backArrowClicked.png')
							: require('../../../assets/backArrow.png')
					}
					style={styles.image}
				/>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 68,
		height: 68,
		resizeMode: 'contain',
	},
})

export default BackButton
