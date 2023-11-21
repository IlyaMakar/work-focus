import { useEffect } from 'react'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'
import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'

interface IUseEffectTimer
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'currentSession'> {}

export const useEffectTimer = ({
	setTimer,
	currentSession
}: IUseEffectTimer) => {
	useEffect(() => {
		if (currentSession === sessionCount + 1) {
			setTimer(prev => ({ ...prev, status: EnumStatus.COMPLETED }))
		}
	}, [currentSession])
}
