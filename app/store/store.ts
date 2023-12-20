import storage from 'redux-persist/lib/storage'
import {
	persistReducer,
	PersistConfig,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import { rootReducer } from '@/store/root-reducer'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage,
	whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
	}
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
