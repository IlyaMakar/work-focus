import { FC, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60

//TODO: Добавить стелочки для скипа кругов

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)

	return (
		<View className='justify-center flex-1 '>
			<View className='self-center'>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#E3BC6F', '#E89D00']}
					colorsTime={[7, 0]}
					trailColor='#5C461A'
					onComplete={() => setIsPlaying(false)}
					size={300}
					strokeWidth={10}
				>
					{({ remainingTime }) => {
						let minutes: string | number = Math.floor(remainingTime / 60)
						minutes = minutes < 10 ? '0' + minutes : minutes
						let seconds: string | number = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<View className='mt-5'>
								<Text className=' text-white text-5xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status === EnumStatus.WORK ? 'РАБОТАЙ' : 'ОТДЫХАЙ'}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View className='w-4 h-4 bg-primary rounded-full' />
							{index + 1 !== sessionCount && (
								<View className='w-6 h-0.5 bg-primary' />
							)}
						</View>
					))}
				</View>
			</View>
			<Pressable
				onPress={() => setIsPlaying(!isPlaying)}
				className={cn(
					'self-center mt-10 bg-primary w-[65] h-[65] rounded-full items-center justify-center',
					{
						'pl-1.5': !isPlaying
					}
				)}
				style={{
					shadowColor: AppConstants.primary,
					shadowOffset: {
						width: 0,
						height: 4
					},
					shadowOpacity: 0.6,
					shadowRadius: 8,
					elevation: 20
				}}
			>
				<Foundation
					name={isPlaying ? 'pause' : 'play'}
					color='white'
					size={44}
				/>
			</Pressable>
		</View>
	)
}

export default Timer
