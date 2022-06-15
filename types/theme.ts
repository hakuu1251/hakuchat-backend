import IRef from './ref'

export interface ITheme {
	title: string
	// дефолтные темы которые будут подгружаться у всех пользователей 
	// должен будет создавать админ
	user: IRef 
	font: string
	rounded: boolean
	background: string
	accent: string
	accent_second: string
	text: string
	text_second: string
	manager_message: string
	guest_message: string
	disabled: string
	open_button: string
	close_button: string
	is_online: string
	is_offline: string
}