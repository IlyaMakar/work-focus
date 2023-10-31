import { IRoute } from '@/navigation/navigation.types'
import Auth from '@/components/screens/auth/Auth'
import Settings from '@/components/screens/settings/Settings'
import Home from '@/components/screens/home/Home'
import Profile from '@/components/screens/profile/Profile'

export const routes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'Profile',
		component: Profile
	}
]
