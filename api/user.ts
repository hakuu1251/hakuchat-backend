import { Router, Request, Response } from 'express'
import User from '../models/user'


const userRouter = Router()

userRouter.get('/all', (req: Request, res: Response) => {
	User.find().lean().exec((err, users) => {
		return res.send(JSON.stringify(users))
	})
})

userRouter.post('/create', async (req: Request, res: Response) => {
	// console.log(req.body)

	// if user with current email is deleted
	// remove his from db and create new user XDXDDDDDD
	
	// TODO: Add CASCADE remove operation
	// User.pre('remove', (next) => {

	// })

	const oldUser = await User.findOne({email: req.body.email})
	if (oldUser && oldUser.isRemoved === true) {
		oldUser.remove()
	}

	const userDetails = new User({
		username: req.body.username,
		email: req.body.email,
		type: req.body.type
	})

	userDetails.save((err, doc) => {
		const response = res.setHeader("Content-Type", "application/json")

		if (!err) 
		{
			response.send(JSON.stringify({
				id: doc.id,
				email: doc.email,
				type: doc.type,
				isCreated: true
			}))
		}
		else 
		{
			response.send(JSON.stringify({
				error: err.message,
				isCreated: false
			}))
		} 
	})
})

userRouter.put('/rm', async (req: Request, res: Response) => {
	const response = res.setHeader("Content-Type", "application/json")
	try {
		await User.findOneAndUpdate({_id: req.body.id}, {isRemoved: true})
		response.send(JSON.stringify({id: req.body.id, isRemoved: true}))
	} catch(err: any) {
		response.send(JSON.stringify({error: err || err.message}))
	}
})

userRouter.put('/reset', async (req: Request, res: Response) => {
	const response = res.setHeader("Content-Type", "application/json")
	try {
		await User.findOneAndUpdate({_id: req.body.id}, {isRemoved: false})
		response.send(JSON.stringify({id: req.body.id, isRemoved: false}))
	} catch(err: any) {
		response.send(JSON.stringify({error: err || err.message}))
	}
})

export default userRouter
