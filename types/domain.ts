import IRef from './ref'

export interface IDomain {
	_id: string
	url: string
	user: IRef
}