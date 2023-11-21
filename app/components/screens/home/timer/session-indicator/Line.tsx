import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'
import { IPointProps } from '@/components/screens/home/timer/session-indicator/session-indicator.interface'

const Line: FC<IPointProps> = ({ isSmallIndicator, index, currentSession }) => {
	if (index + 1 === sessionCount) return null

	return (
		<View
			className={cn(
				'h-0.5 bg-[#696969] opacity-60',
				{
					'bg-primary opacity-60': index + 2 <= currentSession
				},
				isSmallIndicator ? 'w-5 ' : 'w-7'
			)}
		/>
	)
}

export default Line
