import React, { FC } from 'react'
import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { Pressable, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useTimerTimer } from '@/components/screens/home/timer/circle-timer/useTimerTimer'

interface ITimerInfo
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'status'> {
	remainingTime: number
}

const formatTime = (number: number) => (number < 10 ? '0' + number : number)

const TimerInfo: FC<ITimerInfo> = ({ remainingTime, setTimer, status }) => {
	const { seconds, minutes } = useTimerTimer(remainingTime, status)

	return (
		<View className='mt-14'>
			<Text className=' text-white text-5xl font-semibold'>{`${formatTime(
				minutes
			)}:${formatTime(seconds)}`}</Text>
			<Text className='text-center text-2xl text-white mt-0.5'>{status}</Text>

			<Pressable
				onPress={() => {
					setTimer(prev => ({
						...prev,
						key: 0,
						isPlaying: false,
						currentSession: 1,
						currentBreak: 0,
						status: EnumStatus.WORK
					}))
				}}
				className='opacity-40 self-center mt-6'
			>
				<Entypo name='ccw' size={30} color='white' />
			</Pressable>
		</View>
	)
}

export default TimerInfo
