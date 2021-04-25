import { Router } from 'express'
import controllers from '../../controllers'
import middlewares from '../../middlewares'

const router = Router()

const { auth } = middlewares

router.post('/signin', controllers.api.auth.signIn)

router.post('/signup',
	auth.verifyUser,
	controllers.api.auth.signUp
)

export default router
