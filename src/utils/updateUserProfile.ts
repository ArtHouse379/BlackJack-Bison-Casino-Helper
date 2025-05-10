import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProfile } from '../types/User'
import { createNewUserProfile } from './createUserProfile'

/**
 * Обновляет профиль пользователя в локальном хранилище.
 * Если профиль отсутствует, создаёт новый.
 * @param updates - Объект с обновлёнными полями профиля
 * @returns Обновлённый профиль пользователя
 */
export const updateUserProfile = async (
	updates: Partial<UserProfile>
): Promise<UserProfile> => {
	let userProfile: UserProfile
	try {
		const storedProfile = await AsyncStorage.getItem('userProfile')
		if (storedProfile) {
			userProfile = {
				...(await createNewUserProfile()),
				...JSON.parse(storedProfile),
			}
		} else {
			userProfile = await createNewUserProfile()
		}
	} catch (error) {
		console.error('Error fetching user profile:', error)
		userProfile = await createNewUserProfile()
	}

	const updatedProfile: UserProfile = {
		...userProfile,
		...updates,
		updatedAt: new Date().toISOString(),
		lastSeenAt: new Date().toISOString(),
	}

	await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile))
	return updatedProfile
}
