import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../../App'

interface ProfileButtonProps {
	onPress?: () => void
}
type NavigationProp = StackNavigationProp<RootStackParamList>

const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
	const navigation = useNavigation<NavigationProp>()

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			navigation.navigate('Profile')
		}
	}

	return (
		<Pressable onPress={handlePress}>
			{({ pressed }) => (
				<Image
					source={
						pressed
							? require('@assets/user_icon.png')
							: require('@assets/user_icon_clicked.png')
					}
					style={styles.image}
				/>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 70,
		height: 70,
	},
})

export default ProfileButton
