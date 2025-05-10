import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

type Props = {
	avatarUrl: string | null
	onImagePicked: (uri: string) => void
	style?: any
}

export default function AvatarImagePicker({
	avatarUrl,
	onImagePicked,
	style,
}: Props) {
	const requestPermission = async () => {
		const { status, canAskAgain } =
			await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== 'granted') {
			if (!canAskAgain) {
				alert('Please allow access to photos by your device settings.')
			}
			return false
		}
		return true
	}

	const pickImage = async () => {
		const granted = await requestPermission()
		if (!granted) return
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			quality: 0.8,
		})
		if (result.assets && result.assets.length > 0) {
			onImagePicked(result.assets[0].uri)
		}
	}

	return (
		<>
			<Image
				source={
					avatarUrl ? { uri: avatarUrl } : require('@assets/profile_icon.png')
				}
				style={
					avatarUrl
						? style
						: {
								backgroundColor: '#fff',
								borderWidth: 5,
								borderColor: '#0084FF',
						  }
				}
				resizeMode='cover'
			/>
			<Pressable style={styles.avatarEditIcon} onPress={pickImage}>
				{({ pressed }) => (
					<Image
						source={
							pressed
								? require('@assets/edit_icon_clicked.png')
								: require('@assets/edit_icon.png')
						}
					/>
				)}
			</Pressable>
		</>
	)
}

const styles = StyleSheet.create({
	avatarEditIcon: {
		position: 'absolute',
		top: 0,
		right: -40,
	},
})
