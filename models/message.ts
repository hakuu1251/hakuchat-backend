import { Schema, model } from 'mongoose'
import { IMessage } from '../types/message'

const messageSchema = new Schema<IMessage>({
	// TODO: Додумать етот момент
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User' || 'Guest',
		required: true
	},
})