import IRef from './ref'

export interface IMessage {
	isGuest: boolean
	user: IRef
	guest: IRef
	domain: IRef
	text: string
}