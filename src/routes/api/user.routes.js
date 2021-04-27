import { Router } from 'express'
import controllers from '../../controllers'
import middlewares from '../../middlewares'

const router = Router()
const { auth } = middlewares
const { api } = controllers

router.post('/task', auth.isUser, api.user.createTask)

export default router
