import { TYPOGRAPHY } from '@/constants/typography'
import React from 'react'
import {
	Dimensions,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

interface ViewReportButtonProps {
	title: string
	onPress: () => void
}

const { width } = Dimensions.get('window')

const ViewReportButton: React.FC<ViewReportButtonProps> = ({
	title,
	onPress,
}) => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.primaryButton} onPress={onPress}>
				{({ pressed }) => (
					<ImageBackground
						style={styles.buttonBgImage}
						resizeMode='contain'
						source={
							pressed
								? require('@assets/buttons/button_2xl_clicked.png')
								: require('@assets/buttons/button_2xl.png')
						}
					>
						<Text style={[TYPOGRAPHY.H31]}>{title}</Text>
					</ImageBackground>
				)}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		position: 'absolute',
		bottom: 10,
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	buttonBgImage: {
		width: width,
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default ViewReportButton
