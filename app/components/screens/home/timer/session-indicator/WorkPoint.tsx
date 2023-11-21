import { FC } from 'react'
import cn from 'clsx'
import { View } from 'react-native'
import { IPointProps } from './session-indicator.interface'

const WorkPoint: FC<IPointProps> = ({
	currentSession,
	index,
	isSmallIndicator
}) => {
	return (
		<View
			className={cn(
				'rounded-full border-[2px]',
				index + 1 === currentSession
					? 'bg-transparent border-primary'
					: 'border-transparent bg-[#696969] opacity-60',
				{
					'bg-primary opacity-60':
						index + 1 <= currentSession && index + 1 !== currentSession
				},
				isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
			)}
		/>
	)
}

export default WorkPoint
