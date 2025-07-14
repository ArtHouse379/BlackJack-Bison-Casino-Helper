import { APP_ROUTES } from '@/constants/routes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../../App'

interface SettingsButtonProps {
	onPress?: () => void
}

type NavigationProp = StackNavigationProp<RootStackParamList>

const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress }) => {
	const navigation = useNavigation<NavigationProp>()

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			navigation.navigate(APP_ROUTES.History)
		}
	}

	return (
		<Pressable onPress={handlePress}>
			{({ pressed }) => (
				<Image
					source={
						pressed
							? require('@assets/settings_icon.png')
							: require('@assets/settings_icon_clicked.png')
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
