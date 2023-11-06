import { FC, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'

const flowDuration = 10
const sessionCount = 7
const breakDuration = 1 * 60

//TODO: Добавить стелочки для скипа кругов

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState(1)
	const [key, setKey] = useState(0)

	useEffect(() => {
		if (isPlaying && status === EnumStatus.REST) {
			setKey(prev => prev + 1)
			setStatus(EnumStatus.WORK)
		}
	}, [isPlaying])

	const isAllSessionsComplited = currentSession === sessionCount

	return (
		<View className='justify-center flex-1 '>
			<View className='self-center'>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#E3BC6F', '#E89D00']}
					colorsTime={[flowDuration, 0]}
					trailColor='#5C461A'
					onComplete={() => {
						setIsPlaying(false)
						setCurrentSession(prev => prev + 1)
						setStatus(EnumStatus.REST)

						if (isAllSessionsComplited) {
							//TODO: Anim
							setStatus(EnumStatus.COMPLETED)
						}
					}}
					size={300}
					strokeWidth={10}
					onUpdate={remainingTime => {
						if (!!remainingTime) setStatus(EnumStatus.WORK)
					}}
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
							<View className='mt-5'>
								<Text className=' text-white text-5xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View
								className={cn(
									'w-5 h-5 opacity-60 rounded-full border-[3px]',
									index + 1 === currentSession
										? 'w-[22px] h-[22px] border-[#FDB827] bg-transparent'
										: 'w-5 h-5 border-transparent bg-[#696969]',
									{
										'bg-primary opacity-60':
											index + 1 <= currentSession && index + 1 !== sessionCount
									}
								)}
							/>
							{index + 1 !== sessionCount && (
								<View
									className={cn('w-6 h-0.5 bg-[#696969] opacity-60', {
										'bg-primary opacity-60': index + 2 <= currentSession
									})}
								/>
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
