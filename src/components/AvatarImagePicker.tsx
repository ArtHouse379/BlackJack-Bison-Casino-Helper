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
			{avatarUrl ? (
				<Image source={{ uri: avatarUrl }} style={style} resizeMode='cover' />
			) : (
				<Image
					source={require('@assets/profile_icon.png')}
					style={style}
					resizeMode='cover'
				/>
			)}
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
