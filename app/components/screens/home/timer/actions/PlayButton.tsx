import cn from 'clsx'
import { playShadow } from '@/components/screens/home/timer/actions/button-shadow'
import { Foundation } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import {
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { FC } from 'react'

interface IPlayButton
	extends Omit<ITimerProps, 'timer'>,
		Pick<ITimerOptions, 'isPlaying'> {}

const PlayButton: FC<IPlayButton> = ({ isPlaying, setTimer }) => {
	return (
		<Pressable
			onPress={() =>
				setTimer(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
			}
			className={cn(
				'mx-7 bg-primary w-[65] h-[65] rounded-full items-center justify-center',
				{
					'pl-1.5': !isPlaying
				}
			)}
			style={playShadow}
		>
			<Foundation name={isPlaying ? 'pause' : 'play'} color='white' size={44} />
		</Pressable>
	)
}
export default PlayButton
