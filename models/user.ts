import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IUser } from '../types/user'

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, 'invalid email']
	},
	domains: {
		type: Array,
		required: false,
		unique: false,
	},
	type: {
		type: String,
		enum: ['member', 'owner', 'admin'],
		required: true,
		updated_at: Date
	},
})

const User = model<IUser>('User', userSchema)

export default User