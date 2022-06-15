interface IRef {
	$ref: string
	$id: string
}

export interface IDomain {
	_id: string
	url: string
	user: IRef
}