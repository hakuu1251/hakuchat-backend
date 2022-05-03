export interface IUser {
	username: string
	email: string
	domains?: Array<object>
	type: string
	updated_at: Date
}