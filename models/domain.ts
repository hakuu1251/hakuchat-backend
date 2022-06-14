import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IDomain } from '../types/domain'
import User from './user'

const domainSchema = new Schema<IDomain>({
	url: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isURL, 'invalid URL']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: true
	}
})

const Domain = model<IDomain>('Domain', domainSchema)

export default Domain