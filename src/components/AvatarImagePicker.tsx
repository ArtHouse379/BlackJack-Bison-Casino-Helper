import { pickImageFromLibrary } from '@/utils/imagePicker/pickImage'
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
	const handlePick = async () => {
		const uri = await pickImageFromLibrary()
		if (uri) {
			onImagePicked(uri)
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
			<Pressable style={styles.avatarEditIcon} onPress={handlePick}>
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
