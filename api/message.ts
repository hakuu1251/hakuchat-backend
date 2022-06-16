import { Router, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IMessage } from '../types/message'
import Message from '../models/message'
import Guest from '../models/guest'

const messageRouter = Router()

