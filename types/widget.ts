import IRef from './ref'

export interface IWidget {
	domain: IRef
	auto_messages: Array<string>
	manager_name: string
	text_in_header: string
	email_for_contact: boolean
	avatar: string | boolean
	size: string
	theme: IRef
}