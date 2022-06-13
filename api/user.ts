import { Router, Request, Response } from 'express'
import User from '../models/user'


const userRouter = Router()

userRouter.get('/all', (req: Request, res: Response) => {
	User.find().lean().exec((err, users) => {
		return res.end(JSON.stringify(users))
	})
})

userRouter.post('/', (req: Request, res: Response) => {
	// console.log(req.body)
	const userDetails = new User({
		username: req.body.username,
		email: req.body.email,
		type: req.body.type
	})

	userDetails.save((err, doc) => {
		if (!err) res.send(`User added successfully!`)
		else res.send(`${err}`)
	})
})

export default userRouter
