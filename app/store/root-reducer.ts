import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authSlice } from '@/store/auth/auth.slice'

export const rootReducer: Reducer<any> = combineReducers({
	auth: authSlice.reducer
})
