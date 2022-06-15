import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IUser } from '../types/user'
import Domain from './domain'

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
		required: true
	},
	isRemoved: {
		type: Boolean,
		required: true,
		default: false
	}
}, { timestamps: true })

userSchema.post('remove', async (doc) => {
	const { deletedCount } = await Domain.deleteMany({ user: doc.id })
	console.log(`⚡️[server]: ` + deletedCount + ` domains of user ` + doc.id  + ` deleted`)
})

const User = model<IUser>('User', userSchema)

export default User