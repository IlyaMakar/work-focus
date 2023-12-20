import { IAuthResponse } from '@/services/auth/auth-service.interface'
import instance from '@/services/api/interceptor'
import {
	removeTokenFromStorage,
	saveTokenToStorage
} from '@/services/auth/auth.helper'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/login', {
			email,
			password
		})

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response.data
	},
	async register(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/register', {
			email,
			password
		})

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response.data
	},
	logout() {
		removeTokenFromStorage()
	}
}
