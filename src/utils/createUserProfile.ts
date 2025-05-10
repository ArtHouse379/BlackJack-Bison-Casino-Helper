import { UserProfile } from '@/types/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export const createNewUserProfile = async (): Promise<UserProfile> => {
	const newProfile: UserProfile = {
		id: uuidv4(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		lastSeenAt: new Date().toISOString(),
		username: 'Nickname',
		avatarUrl: '@assets/profile_icon.png',
		isNotificationEnabled: false,
		language: 'English',
		isOnline: false,
		isPlaying: false,
		isAdmin: false,
		isInGame: false,
		isPremiumUser: false,
		calculationsHistory: [],
		simulationsHistory: [],
	}

	await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile))
	return newProfile
}
