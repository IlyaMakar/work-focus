import React, { FC } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'

interface IArrow
	extends Omit<ITimerProps, 'timer'>,
		Pick<ITimerOptions, 'currentSession'> {
	direction: 'left' | 'right'
}

const Arrow: FC<IArrow> = ({ setTimer, currentSession, direction }) => {
	return (
		<Pressable
			onPress={() => {
				if (currentSession !== 1 && direction === 'left') {
					setTimer(prev => ({
						...prev,
						currentSession: prev.currentSession - 1,
						key: prev.key - 1,
						isPlaying: false,
						currentBreak:
							currentSession % 2 ? prev.currentBreak - 1 : prev.currentBreak,
						status:
							(currentSession + 2) % 2 === 0 && currentSession !== 2
								? EnumStatus.REST
								: EnumStatus.WORK
					}))
				}

				if (currentSession !== sessionCount + 1 && direction === 'right') {
					setTimer(prev => {
						return {
							...prev,
							currentSession: prev.currentSession + 1,
							key: prev.key + 1,
							isPlaying: false,
							currentBreak:
								currentSession % 2 === 0
									? prev.currentBreak + 1
									: prev.currentBreak,
							status:
								(currentSession + 2) % 2 === 0
									? EnumStatus.REST
									: EnumStatus.WORK
						}
					})
				}
			}}
			className='opacity-40'
		>
			<Entypo name={`chevron-${direction}`} size={34} color='white' />
		</Pressable>
	)
}

export default Arrow
