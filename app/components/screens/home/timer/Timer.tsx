import React, { FC, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'

const flowDuration = 10
const sessionCount = 7
const breakDuration = 1 * 60

const isSmallIndicator = sessionCount > 7

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
			<View className='self-center items-center'>
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
							<View className='mt-14'>
								<Text className=' text-white text-5xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status}
								</Text>

								<Pressable
									onPress={() => {
										setKey(0)
										setIsPlaying(false)
										setCurrentSession(1)
									}}
									className='opacity-40 self-center mt-5'
								>
									<Entypo name='ccw' size={30} color='white' />
								</Pressable>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View
								className={cn(
									'rounded-full border-[2px]',
									index + 1 === currentSession
										? `bg-transparent border-primary ${
												isSmallIndicator
													? 'w-[17px] h-[17px]'
													: 'w-[22px] h-[22px]'
										  } `
										: `border-transparent bg-[#696969] opacity-60 ${
												isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
										  }`,
									{
										'bg-primary opacity-60':
											index + 1 <= currentSession &&
											index + 1 !== currentSession
									}
								)}
							/>
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
			</View>

			<View className='flex-row items-center justify-center mt-14 relative'>
				<Pressable
					onPress={() => {
						if (currentSession !== 1) {
							setCurrentSession(prev => prev - 1)
							setKey(prev => prev - 1)
							setIsPlaying(false)
						}
					}}
					className='opacity-40'
				>
					<Entypo name='chevron-left' size={34} color='white' />
				</Pressable>

				<Pressable
					onPress={() => setIsPlaying(!isPlaying)}
					className={cn(
						'mx-7 bg-primary w-[65] h-[65] rounded-full items-center justify-center',
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

				<Pressable
					onPress={() => {
						if (currentSession !== sessionCount + 1) {
							setCurrentSession(prev => prev + 1)
							setKey(prev => prev + 1)
							setIsPlaying(false)
						}
					}}
					className='opacity-40'
				>
					<Entypo name='chevron-right' size={34} color='white' />
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
