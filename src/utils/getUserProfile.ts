import { UserProfile } from '@/types/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNewUserProfile } from './createUserProfile'

export const getUserProfile = async (): Promise<UserProfile | undefined> => {
	try {
		const storedProfile = await AsyncStorage.getItem('userProfile')
		if (storedProfile) {
			const parsed = JSON.parse(storedProfile)
			if (parsed && parsed.id && parsed.username) return parsed
		}
	} catch (e) {
		throw new Error('Ошибка при чтении профиля из AsyncStorage')
	}
	createNewUserProfile()
	return undefined
}
