import axios from 'axios'
import Cookies from 'js-cookie'
import { Platform } from 'react-native'

// Используйте process.env.SERVER_URL, чтобы получить значение переменной окружения
export const API_URL = `${process.env.SERVER_URL}/api`

export const getContentType = () => ({
	'Content-Type': 'application/json'
})

const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

export default instance
