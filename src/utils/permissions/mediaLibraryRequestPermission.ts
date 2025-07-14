import * as ImagePicker from 'expo-image-picker'

export const mediaLibraryRequestPermission = async () => {
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
