import { SimulationResult } from '@/types/SimulationResult'
import { getUserProfile } from '@/utils/getUserProfile'
import { updateUserProfile } from '@/utils/updateUserProfile'

export const saveSimulationToUserProfile = async (
	simulationResult: SimulationResult
) => {
	try {
		const userProfile = await getUserProfile()
		const currentHistory = userProfile?.simulationsHistory || []

		await updateUserProfile({
			simulationsHistory: [...currentHistory, simulationResult],
		})
	} catch (e) {
		console.error('Ошибка при сохранении симуляции в профиль пользователя:', e)
	}
}
