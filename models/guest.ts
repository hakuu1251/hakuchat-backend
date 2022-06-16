import { Schema, model } from 'mongoose'
import { IGuest } from '../types/guest'
import validator from 'validator'

const guestSchema = new Schema<IGuest>({
	domain: {
		type: Schema.Types.ObjectId,
		ref: 'Domain',
		required: true
	},
	name: {
		type: String
	},
	email: {
		type: String,
		validator: [validator.isEmail, 'Invalid email']
	},
	phone: {
		type: String,
		validator: [validator.isMobilePhone, 'Invalid phone number']
	},
	ip: {
		type: String,
		required: true
	}
})

const Guest = model<IGuest>('Guest', guestSchema)

export default Guest