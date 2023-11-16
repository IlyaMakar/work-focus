import { Dispatch, SetStateAction } from 'react'

export enum EnumStatus {
	REST = 'Отдыхай',
	WORK = 'Работай',
	COMPLETED = 'ПРЕВОСХОДНО'
}

export interface ITimerOptions {
	isPlaying: boolean
	status: EnumStatus
	currentSession: number
	currentBreak: number
	key: number
}

export interface ITimerProps {
	timer: ITimerOptions
	setTimer: Dispatch<SetStateAction<ITimerOptions>>
}
