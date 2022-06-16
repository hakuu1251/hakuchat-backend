import { Schema, model } from 'mongoose'
import { IMessage } from '../types/message'

const messageSchema = new Schema<IMessage>({
	isGuest: {
		type: Boolean,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	guest: {
		type: Schema.Types.ObjectId,
		ref: 'Guest',
		required: true
	},
	domain: {
		type: Schema.Types.ObjectId,
		ref: 'Domain',
		required: true
	}
}, { timestamps: true })

const Message = model<IMessage>('Message', messageSchema)

export default Message