import { Router } from 'express'
import controllers from '../../controllers'
import middlewares from '../../middlewares'

const router = Router()
const { auth } = middlewares
const { api } = controllers

router.post('/task', auth.isUser, api.user.createTask)

router.post('/task/:id', auth.isUser, api.user.editTask)

router.post('/deletetask/:id', auth.verifySession,  auth.isUser, api.user.deleteTask)

export default router
