const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Добавляем поддержку алиасов
config.resolver.extraNodeModules = {
	'@assets': path.resolve(__dirname, 'assets'),
	'@': path.resolve(__dirname, 'src'),
}

module.exports = config
