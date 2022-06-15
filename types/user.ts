import { SchemaTimestampsConfig } from 'mongoose'
export interface IUser {
	_id: string
	username: string
	email: string
	type: string
	isRemoved: boolean
	timestamps: SchemaTimestampsConfig
}