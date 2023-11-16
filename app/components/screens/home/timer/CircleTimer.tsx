import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import {
	EnumStatus,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { Entypo } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {
	breakDuration,
	flowDuration,
	sessionCount
} from '@/components/screens/home/timer/timer.constants'

const CircleTimer: FC<ITimerProps> = ({
	timer: { key, isPlaying, currentSession, status },
	setTimer
}) => {
	const isAllSessionsComplited = currentSession === sessionCount

	return (
		<CountdownCircleTimer
			key={key}
			isPlaying={isPlaying}
			duration={status === EnumStatus.REST ? breakDuration : flowDuration}
			colors={['#E3BC6F', '#E89D00']}
			colorsTime={[
				status === EnumStatus.REST ? breakDuration : flowDuration,
				0
			]}
			trailColor='#5C461A'
			onComplete={() => {
				setTimer(prev => ({ ...prev, isPlaying: false }))

				if (isAllSessionsComplited) {
					setTimer(prev => ({ ...prev, status: EnumStatus.COMPLETED }))
				}

				setTimer(prev => ({ ...prev, key: prev.key + 1 }))

				if (status === EnumStatus.REST) {
					setTimer(prev => ({
						...prev,
						status: EnumStatus.WORK,
						key: prev.currentSession + 1
					}))
				}

				if (currentSession % 2 === 0) {
					setTimer(prev => ({
						...prev,
						status: EnumStatus.REST,
						currentBreak: prev.currentBreak + 1
					}))
				} else {
					setTimer(prev => ({
						...prev,
						currentBreak: prev.currentSession + 1
					}))
				}
			}}
			size={300}
			strokeWidth={10}
		>
			{({ remainingTime }) => {
				let minutes: string | number = Math.floor(remainingTime / 60)
				let seconds: string | number = remainingTime % 60

				if (status === EnumStatus.REST) {
					minutes = Math.floor(flowDuration / 60)
					seconds = flowDuration % 60
				}

				minutes = minutes < 10 ? '0' + minutes : minutes
				seconds = seconds < 10 ? '0' + seconds : seconds

				return (
					<View className='mt-14'>
						<Text className=' text-white text-5xl font-semibold'>{`${minutes}:${seconds}`}</Text>
						<Text className='text-center text-2xl text-white mt-0.5'>
							{status}
						</Text>

						<Pressable
							onPress={() => {
								setTimer(prev => ({
									...prev,
									key: 0,
									isPlaying: false,
									currentSession: 1,
									currentBreak: 0
								}))
							}}
							className='opacity-40 self-center mt-6'
						>
							<Entypo name='ccw' size={30} color='white' />
						</Pressable>
					</View>
				)
			}}
		</CountdownCircleTimer>
	)
}
export default CircleTimer
