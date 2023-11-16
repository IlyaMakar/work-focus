import React, { FC, useState } from 'react'
import { View } from 'react-native'
import {
	EnumStatus,
	ITimerOptions
} from '@/components/screens/home/timer/timer.interface'
import CircleTimer from '@/components/screens/home/timer/CircleTimer'
import SessionIndicator from '@/components/screens/home/timer/session-indicator/SessionIndicator'
import Actions from '@/components/screens/home/timer/actions/Actions'

const Timer: FC = () => {
	const [timer, setTimer] = useState<ITimerOptions>({
		isPlaying: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		currentBreak: 0,
		key: 0
	})

	return (
		<View className='justify-center flex-1 '>
			<View className='self-center items-center'>
				<CircleTimer setTimer={setTimer} timer={timer} />
				<SessionIndicator
					currentSession={timer.currentSession}
					currentBreak={timer.currentBreak}
				/>
			</View>

			<Actions timer={timer} setTimer={setTimer} />
		</View>
	)
}

export default Timer
