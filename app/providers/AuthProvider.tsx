import * as Splash from 'expo-splash-screen'
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import { Text, View } from 'react-native'
import { IUser } from '@/types/user.interface'

export type TypeUserState = IUser | null

interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)

let ignore = Splash.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		// Get user from async storage and write to store
	}, [])

	return (
		<View>
			<Text>AuthProvider</Text>
		</View>
	)
}

export default AuthProvider
