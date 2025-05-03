import { CalculationResult } from './Calculation'
import { SimulationResult } from './SimulationResult'

export interface User {
	id: string
	createdAt: string
	updatedAt: string
	lastSeenAt: string
	username: string
	avatarUrl: string
	isNotificationEnabled: boolean
	language: string
	isOnline: boolean
	isPlaying: boolean
	isAdmin: boolean
	isInGame: boolean
}

export interface UserProfile extends User {
	calculationsHistory: CalculationResult[] | undefined
	simulationsHistory: SimulationResult[] | undefined
}
