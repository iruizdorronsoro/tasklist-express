import { Router } from 'express'
import controllers from '../../controllers'
import middlewares from '../../middlewares'

const router = Router()
const { auth, user } = middlewares
const { api } = controllers

router.post('/task', auth.isUser)

export default router
