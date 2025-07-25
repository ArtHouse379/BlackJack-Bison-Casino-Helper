import AnimatedStars from '@/components/animation/AnimatedStars'
import AvatarImagePicker from '@/components/AvatarImagePicker'
import BackButton from '@/components/buttons/BackButton'
import SettingsButton from '@/components/buttons/SettingsButton'
import { APP_ROUTES } from '@/constants/routes'
import { TYPOGRAPHY } from '@/constants/typography'
import { UserProfile } from '@/types/User'
import { updateUserProfile } from '@/utils/updateUserProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../../App'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>

export default function ProfileScreen() {
	const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
	const [isEditingNickname, setIsEditingNickname] = useState(false)
	const [nickname, setNickname] = useState('Nickname')
	const [language, setLanguage] = useState('English')
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [handsPlayed, setHandsPlayed] = useState(0)
	const [strategyTestsPassed, setStrategyTestsPassed] = useState(0)
	const navigation = useNavigation<NavigationProp>()

	// Load profile on mount
	useEffect(() => {
		const loadProfile = async () => {
			const storedProfile = await AsyncStorage.getItem('userProfile')
			if (storedProfile) {
				const profile: UserProfile = JSON.parse(storedProfile)
				setNickname(profile.username)
				setAvatarUrl(profile.avatarUrl)
				setIsNotificationsEnabled(profile.isNotificationEnabled)
				setLanguage(profile.language)
				// handsPlayed and strategyTestsPassed - from history, if exist
				setHandsPlayed(profile.simulationsHistory?.length || 0)
				setStrategyTestsPassed(profile.calculationsHistory?.length || 0)
			}
		}
		loadProfile()
	}, [])

	// Update profile function
	const handleProfileUpdate = async (updates: Partial<UserProfile>) => {
		const updated = await updateUserProfile(updates)
		if (updates.username !== undefined) setNickname(updated.username)
		if (updates.avatarUrl !== undefined) setAvatarUrl(updated.avatarUrl)
		if (updates.isNotificationEnabled !== undefined)
			setIsNotificationsEnabled(updated.isNotificationEnabled)
		if (updates.language !== undefined) setLanguage(updated.language)
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

	const onNotificationsToggle = async () => {
		setIsNotificationsEnabled(!isNotificationsEnabled)
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
			resizeMode='contain'
		>
			<AnimatedStars />
			<SafeAreaView>
				<View style={styles.container}>
					{/* Top buttons */}
					<View style={styles.topBar}>
						<BackButton />
						<Image
							source={require('@assets/page_headers/profile_header.png')}
						/>
						<SettingsButton />
					</View>
					<ScrollView contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}>
						{/* Avatar and nickname */}
						<View style={styles.avatarSection}>
							<View style={styles.avatarContainer}>
								<AvatarImagePicker
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
										onLanguageChange(
											language === 'English' ? 'Russian' : 'English'
										)
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
							<Pressable
								onPress={() => navigation.navigate(APP_ROUTES.Premium)}
							>
								<Text
									style={[TYPOGRAPHY.H25, { textDecorationLine: 'underline' }]}
								>
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
					</ScrollView>
				</View>
			</SafeAreaView>
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
		marginTop: 30,
	},
	avatarContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 175,
		height: 175,
		borderRadius: 100,
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
		marginTop: 75,
		columnGap: 20,
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
		marginTop: 40,
		alignItems: 'center',
	},
	statsSection: {
		marginVertical: 50,
		alignItems: 'center',
		rowGap: 30,
	},
	statItem: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10,
	},
})
