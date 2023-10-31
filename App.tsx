import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import AuthProvider from '@/providers/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'

const queryClient = new QueryClient()

/*
TODO:
[] - Customize flow, break, session count
[] - Reset
[] - Day name
[] - Play/Pause
[] - Skip flow
[] - Week/mouth statistics

Timer, Settings + profile, statistics, anim
*/

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar style='light' />
		</QueryClientProvider>
	)
}
