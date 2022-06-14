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
	type: {
		type: String,
		enum: ['member', 'owner', 'admin'],
		default: 'member',
		required: true,
		updated_at: Date
	},
	isRemoved: {
		type: Boolean,
		required: true,
		default: false
	}
})

const User = model<IUser>('User', userSchema)

export default User