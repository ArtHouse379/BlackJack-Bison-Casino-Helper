import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing, Image, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const STAR_COUNT = 10

export default function AnimatedStars() {
	const stars = useRef(
		Array.from({ length: STAR_COUNT }).map(() => ({
			opacity: new Animated.Value(0),
			top: Math.random() * height,
			left: Math.random() * width,
			size: 10 + Math.random() * 20,
		}))
	).current

	useEffect(() => {
		stars.forEach(star => {
			const animateStar = () => {
				star.opacity.setValue(0)
				Animated.sequence([
					Animated.delay(Math.random() * 5000),
					Animated.timing(star.opacity, {
						toValue: 1,
						duration: 2200, // Увеличено для более плавного появления
						easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Добавлен плавный переход
						useNativeDriver: true,
					}),
					Animated.timing(star.opacity, {
						toValue: 1,
						duration: 1000, // Звезда остается видимой 2 секунды
						useNativeDriver: true,
					}),
					Animated.timing(star.opacity, {
						toValue: 0,
						duration: 2000, // Плавное исчезновение
						easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Плавный переход
						useNativeDriver: true,
					}),
				]).start(() => animateStar())
			}

			animateStar()
		})
	}, [])

	return (
		<>
			{stars.map((star, index) => (
				<Animated.View
					key={index}
					style={[
						styles.star,
						{
							opacity: star.opacity,
							top: star.top,
							left: star.left,
							width: star.size,
							height: star.size,
						},
					]}
				>
					<Image
						source={require('../../../assets/animated_star.png')}
						style={{ width: '100%', height: '100%' }}
						resizeMode='contain'
					/>
				</Animated.View>
			))}
		</>
	)
}

const styles = StyleSheet.create({
	star: {
		position: 'absolute',
	},
})
