import { FC } from 'react'
import { Pressable } from 'react-native'
import {
	IMenuItem,
	TypeNav
} from '@/components/ui/layout/bottom-menu/menu.interface'
import { Feather } from '@expo/vector-icons'
import { AppConstants } from '@/app.constants'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNav
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, nav, item }) => {
	const isActive = currentRoute === item.path

	return (
		<Pressable
			className='w-[24%] items-center'
			style={
				isActive
					? {
							shadowColor: AppConstants.primary,
							shadowOffset: {
								width: 1,
								height: 10
							},
							shadowOpacity: 0.7,
							shadowRadius: 10,
							elevation: 20
					  }
					: {}
			}
			onPress={() => nav(item.path)}
		>
			<Feather
				name={item.iconName}
				size={26}
				color={isActive ? AppConstants.primary : '#8D8A97'}
			/>
		</Pressable>
	)
}

export default MenuItem
