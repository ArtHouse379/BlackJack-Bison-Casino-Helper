import React from 'react'
import {
	Dimensions,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { TYPOGRAPHY } from '../constants/typography'

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
						resizeMode='cover'
						source={
							pressed
								? require('../../assets/buttons/button_2xl_clicked.png')
								: require('../../assets/buttons/button_2xl.png')
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
		marginVertical: 20,
		position: 'absolute',
		bottom: 80,
	},
	primaryButton: {
		alignItems: 'center',
		position: 'relative',
	},
	buttonBgImage: {
		width: width * 0.76,
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
	},
})

export default ViewReportButton
