import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

interface SettingsButtonProps {
	onPress?: () => void
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress }) => {
	const navigation = useNavigation()

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			navigation.navigate('History' as never)
		}
	}

	return (
		<Pressable onPress={handlePress}>
			{({ pressed }) => (
				<Image
					source={
						pressed
							? require('../../../assets/settings_icon.png')
							: require('../../../assets/settings_icon_clicked.png')
					}
					style={styles.image}
				/>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 68,
		height: 68,
		resizeMode: 'contain',
	},
})

export default SettingsButton
