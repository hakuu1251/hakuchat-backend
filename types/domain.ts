interface IRef {
	$ref: string,
	$id: string
}

export interface IDomain {
	url: string,
	user: IRef
}