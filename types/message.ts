import IRef from './ref'

export interface IMessage {
	from: IRef
	to: IRef
	domain: IRef
	text: string
}