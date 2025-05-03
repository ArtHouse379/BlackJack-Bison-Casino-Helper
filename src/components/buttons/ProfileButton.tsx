import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

interface ProfileButtonProps {
	onPress?: () => void
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress }) => {
	const navigation = useNavigation()

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			navigation.navigate('Profile' as never)
		}
	}

	return (
		<Pressable onPress={handlePress}>
			{({ pressed }) => (
				<Image
					source={
						pressed
							? require('../../../assets/user_icon.png')
							: require('../../../assets/user_icon_clicked.png')
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
