import GetPremiumScreen from '@/screens/GetPremiumScreen'
import HandDecisionScreen from '@/screens/HandDecisionScreen'
import HandSimulatorScreen from '@/screens/HandSimulatorScreen'
import HistoryScreen from '@/screens/HistoryScreen'
import MainMenuScreen from '@/screens/MainMenuScreen'
import ProfileScreen from '@/screens/ProfileScreen'
import StatisticsScreen from '@/screens/StatisticsScreen'
import StrategyGuideScreen from '@/screens/StrategyGuideScreen'
import WelcomeScreen from '@/screens/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export type RootStackParamList = {
	Welcome: undefined
	MainMenu: undefined
	StrategyGuide: undefined
	HandDecision: undefined
	HandSimulator: undefined
	Statistics: undefined
	Profile: undefined
	History: undefined
	Premium: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
	const [fontsLoaded] = useFonts({
		'DoHyeon-Regular': require('@assets/fonts/DoHyeon-Regular.ttf'),
		'Dosis-Regular': require('@assets/fonts/Dosis-Regular.ttf'),
		'Dosis-Medium': require('@assets/fonts/Dosis-Medium.ttf'),
		'Dosis-Bold': require('@assets/fonts/Dosis-Bold.ttf'),
		'Dosis-SemiBold': require('@assets/fonts/Dosis-SemiBold.ttf'),
		'Dosis-ExtraBold': require('@assets/fonts/Dosis-ExtraBold.ttf'),
	})

	if (!fontsLoaded) {
		return null // или <AppLoading />
	}
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						cardStyle: { backgroundColor: '#1C1C1E' },
					}}
				>
					<Stack.Screen name='Welcome' component={WelcomeScreen} />
					<Stack.Screen name='MainMenu' component={MainMenuScreen} />
					<Stack.Screen name='StrategyGuide' component={StrategyGuideScreen} />
					<Stack.Screen name='HandDecision' component={HandDecisionScreen} />
					<Stack.Screen name='HandSimulator' component={HandSimulatorScreen} />
					<Stack.Screen name='Statistics' component={StatisticsScreen} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
					<Stack.Screen name='History' component={HistoryScreen} />
					<Stack.Screen name='Premium' component={GetPremiumScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
