import AnimatedStars from '@/components/animation/AnimatedStars'
import AvatarImage from '@/components/AvatarImagePicker'
import BackButton from '@/components/buttons/BackButton'
import SettingsButton from '@/components/buttons/SettingsButton'
import { TYPOGRAPHY } from '@/constants/typography'
import { UserProfile } from '@/types/User'
import { updateUserProfile } from '@/utils/updateUserProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default function ProfileScreen() {
	const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
	const [isEditingNickname, setIsEditingNickname] = useState(false)
	const [nickname, setNickname] = useState('Nickname')
	const [language, setLanguage] = useState('English')
	const [avatarUrl, setAvatarUrl] = useState('@assets/profile_icon.png')
	const [handsPlayed, setHandsPlayed] = useState(0)
	const [strategyTestsPassed, setStrategyTestsPassed] = useState(0)
	const navigation = useNavigation()

	// Загрузка профиля при монтировании
	useEffect(() => {
		const loadProfile = async () => {
			const storedProfile = await AsyncStorage.getItem('userProfile')
			if (storedProfile) {
				const profile: UserProfile = JSON.parse(storedProfile)
				setNickname(profile.username)
				setAvatarUrl(profile.avatarUrl)
				setIsNotificationsEnabled(profile.isNotificationEnabled)
				setLanguage(profile.language)
				// Пример: handsPlayed и strategyTestsPassed — из истории, если есть
				setHandsPlayed(profile.simulationsHistory?.length || 0)
				setStrategyTestsPassed(profile.calculationsHistory?.length || 0)
			}
		}
		loadProfile()
	}, [])

	// Функция обновления профиля
	const handleProfileUpdate = async (updates: Partial<UserProfile>) => {
		const updated = await updateUserProfile(updates)
		if (updates.username !== undefined) setNickname(updated.username)
		if (updates.avatarUrl !== undefined) setAvatarUrl(updated.avatarUrl)
		if (updates.isNotificationEnabled !== undefined)
			setIsNotificationsEnabled(updated.isNotificationEnabled)
		if (updates.language !== undefined) setLanguage(updated.language)
	}

	const onAvatarEdit = () => {
		//? TODO: Add avatar edit functionality
		// handleProfileUpdate({ avatarUrl: 'новый путь' })
	}

	const onNicknameEdit = () => {
		setIsEditingNickname(true)
	}

	const onNicknameChange = (text: string) => {
		setNickname(text)
	}

	const onNicknameSubmit = () => {
		setIsEditingNickname(false)
		handleProfileUpdate({ username: nickname })
	}

	const onNotificationsToggle = () => {
		handleProfileUpdate({ isNotificationEnabled: !isNotificationsEnabled })
	}

	const onLanguageChange = (newLang: string) => {
		handleProfileUpdate({ language: newLang })
	}

	const handleAvatarPicked = (uri: string) => {
		setAvatarUrl(uri)
		handleProfileUpdate({ avatarUrl: uri })
	}

	return (
		<ImageBackground
			source={require('@assets/main_bg.png')}
			style={styles.backgroundImage}
			resizeMode='cover'
		>
			<AnimatedStars />
			<View style={styles.container}>
				{/* Top buttons */}
				<View style={styles.topBar}>
					<BackButton />
					<Image source={require('@assets/page_headers/profile_header.png')} />
					<SettingsButton />
				</View>
				{/* Avatar and nickname */}
				<View style={styles.avatarSection}>
					<View style={styles.avatarContainer}>
						<AvatarImage
							avatarUrl={avatarUrl}
							onImagePicked={handleAvatarPicked}
							style={styles.avatar}
						/>
					</View>
					<View style={styles.nicknameWrapper}>
						<View style={styles.nicknameContainer}>
							{isEditingNickname ? (
								<TextInput
									style={[TYPOGRAPHY.H23, { minWidth: 100 }]}
									value={nickname}
									autoFocus
									onChangeText={onNicknameChange}
									onBlur={onNicknameSubmit}
									onSubmitEditing={onNicknameSubmit}
									returnKeyType='done'
								/>
							) : (
								<>
									<Text style={TYPOGRAPHY.H23}>{nickname}</Text>
									<Pressable
										style={styles.nicknameEditIcon}
										onPress={onNicknameEdit}
									>
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
							)}
						</View>
					</View>
				</View>

				{/* Notifications */}
				<View style={styles.notificationsRow}>
					<Text style={TYPOGRAPHY.H24}>Notifications</Text>
					<Pressable onPress={onNotificationsToggle}>
						{isNotificationsEnabled ? (
							<Image source={require('@assets/switch_on.png')} />
						) : (
							<Image source={require('@assets/switch_off.png')} />
						)}
					</Pressable>
				</View>

				{/* Language */}
				<View style={styles.languageWrapper}>
					<View style={styles.languageRow}>
						<Text style={[TYPOGRAPHY.H10, { color: '#0084FF' }]}>
							{language}
						</Text>
						<Pressable
							style={styles.nicknameEditIcon}
							onPress={() =>
								onLanguageChange(language === 'English' ? 'Russian' : 'English')
							}
						>
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
					</View>
				</View>

				<View style={styles.getPremiumContainer}>
					<Pressable onPress={() => navigation.navigate('Premium' as never)}>
						<Text style={[TYPOGRAPHY.H23, { textDecorationLine: 'underline' }]}>
							Get Premium...!
						</Text>
					</Pressable>
				</View>

				{/* Stats */}
				<View style={styles.statsSection}>
					<View style={styles.statItem}>
						<View>
							<Image source={require('@assets/cards_icon.png')} />
						</View>
						<Text style={TYPOGRAPHY.H25}>{handsPlayed} HANDS PLAYED</Text>
					</View>
					<View style={styles.statItem}>
						<View>
							<Image source={require('@assets/strategy_icon.png')} />
						</View>
						<Text style={TYPOGRAPHY.H25}>
							{strategyTestsPassed} STRATEGY TESTS PASSED
						</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
	},
	container: {
		paddingHorizontal: 20,
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: height * 0.06,
	},
	circleButton: {
		width: 70,
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	avatarSection: {
		alignItems: 'center',
		marginVertical: 30,
	},
	avatarContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 175,
		height: 175,
	},
	avatarEditIcon: {
		position: 'absolute',
		top: 0,
		right: -40,
	},
	nicknameWrapper: {
		marginTop: 35,
		alignItems: 'center',
	},
	nicknameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 25,
		paddingVertical: 5,
		borderRadius: 40,
	},
	nickname: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
		marginRight: 8,
	},
	nicknameEditIcon: {
		position: 'absolute',
		right: -50,
	},
	notificationsRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 60,
		columnGap: 20,
	},
	notificationsText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
	languageWrapper: {
		marginTop: 30,
		alignItems: 'center',
	},
	languageRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 50,
		paddingVertical: 10,
		borderRadius: 20,
	},
	getPremiumContainer: {
		marginTop: 50,
		alignItems: 'center',
	},
	statsSection: {
		marginTop: 50,
		alignItems: 'center',
	},
	statItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
		columnGap: 10,
	},
})
