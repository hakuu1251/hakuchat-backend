import IRef from './ref'

export interface IGuest {
	domain: IRef
	name: string
	email: string
	phone: string
	ip: string
}