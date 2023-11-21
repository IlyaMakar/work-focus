import cn from 'clsx'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import { FC } from 'react'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'
import { IBreakPoint } from '@/components/screens/home/timer/session-indicator/session-indicator.interface'

const BreakPoint: FC<IBreakPoint> = ({
	isSmallIndicator,
	index,
	currentBreak
}) => {
	return (index + 1) % 2 === 0 && index + 1 !== sessionCount ? (
		<View
			className={cn(
				'absolute z-10 -top-4 ',
				isSmallIndicator ? 'left-[17px]' : 'left-6'
			)}
		>
			<AntDesign
				name='rest'
				size={isSmallIndicator ? 16 : 18}
				color={index / 2 < currentBreak ? '#FDB827' : '#696969'}
				className='absolute'
			/>
		</View>
	) : null
}

export default BreakPoint
