import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { sessionCount } from '@/components/screens/home/timer/timer.constants'
import { AntDesign } from '@expo/vector-icons'
import { ITimerOptions } from '@/components/screens/home/timer/timer.interface'

interface ISessionIndicator
	extends Pick<ITimerOptions, 'currentBreak' | 'currentSession'> {}

const SessionIndicator: FC<ISessionIndicator> = ({
	currentBreak,
	currentSession
}) => {
	const isSmallIndicator = sessionCount > 7

	return (
		<View className='mt-14 flex-row items-center justify-center'>
			{Array.from(Array(sessionCount)).map((_, index) => (
				<View className='flex-row items-center' key={`point ${index}`}>
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
					{(index + 1) % 2 === 0 && index + 1 !== sessionCount && (
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
					)}

					{index + 1 !== sessionCount && (
						<View
							className={cn(
								'h-0.5 bg-[#696969] opacity-60',
								{
									'bg-primary opacity-60': index + 2 <= currentSession
								},
								isSmallIndicator ? 'w-5 ' : 'w-7'
							)}
						/>
					)}
				</View>
			))}
		</View>
	)
}

export default SessionIndicator
