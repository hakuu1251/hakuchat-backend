import express, { Router, Request, Response } from 'express'
import Domain from '../models/domain'
import User from '../models/user'

const domainRouter = Router()

domainRouter.post('/', (req: express.Request, res: express.Response) => {
	const isUser = User.findById(req.body.user['$id']).exec()
	// console.log('[server]: ' + req.body.user['$id'])
	isUser
		.then(() => {
			const domainDetails = new Domain({
				url: req.body.url,
				user: req.body.user,
			})
		
			domainDetails.save((err, doc) => {
				if (!err) res.send(`Domain added successfully!`)
				else res.send(`Error: ${err} :(`)
			})
		})
		.catch((err) => {
			res.send(`Error: User not found. ${err} :(`)
		})
})

export default domainRouter
