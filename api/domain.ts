import { Router, Request, Response } from 'express'
import Domain from '../models/domain'
import User from '../models/user'

const domainRouter = Router()


domainRouter.post('/add', (req: Request, res: Response) => {
	const isUser = User.findById(req.body.user).exec()
	const response = res.setHeader("Content-Type", "application/json")
	console.log(isUser)

	isUser
		.then(() => {
			const domainDetails = new Domain({
				url: req.body.url,
				user: req.body.user,
			})
			domainDetails.save((err, doc) => {
				if (!err) 
				{
					response.send({
						url: doc.url,
						user: doc.user,
						isCreated: true
					})
				} 
				else 
				{
					response.send({
						error: err.message,
						isCreated: false
					})
				}
			})
		})
		.catch((err) => {
			response.send({
				error: err.message,
				isCreated: false
			})
		})
})

domainRouter.delete('/rm', (req: Request, res: Response) => {
	const response = res.setHeader("Content-Type", "application/json")
	// console.log(req.body)

	Domain.findOneAndRemove({url: req.body.url}, () => {

		response.send(JSON.stringify({	
			url: req.body.url,
			isDeleted: true
		}))
		
	})

})

domainRouter.get('/by-user', async (req: Request, res: Response) => {
	const response = res.setHeader("Content-Type", "application/json")
	// console.log(`Logs🧐:`, req)
	try {
		const docs = await Domain.find({user: req.query.user})
		response.send(JSON.stringify(docs))
	} catch(err: any) {
		response.send(JSON.stringify({error: err || err.message}))
	}
})

export default domainRouter
