import React, { useEffect, useRef } from 'react'
import {
	Animated,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
} from 'react-native'

interface AnimatedCardProps {
	source: ImageSourcePropType
	style?: StyleProp<ImageStyle>
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ source, style }) => {
	const opacity = useRef(new Animated.Value(0)).current
	const scale = useRef(new Animated.Value(0.7)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start()
	}, [])

	return (
		<Animated.Image
			source={source}
			style={[
				{
					opacity,
					transform: [{ scale }],
				},
				style,
			]}
			resizeMode='contain'
		/>
	)
}

export default AnimatedCard
