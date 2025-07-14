// src/utils/imagePicker/pickImageFromLibrary.ts

import * as ImagePicker from 'expo-image-picker'
import { mediaLibraryRequestPermission } from '../permissions/mediaLibraryRequestPermission'

export async function pickImageFromLibrary(): Promise<string | null> {
	const granted = await mediaLibraryRequestPermission()
	if (!granted) return null

	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ['images'],
		quality: 0.8,
	})

	if (result.assets && result.assets.length > 0) {
		return result.assets[0].uri
	}

	return null
}
