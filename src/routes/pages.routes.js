import { Router } from 'express'
import controllers from '../controllers'
import middlewares from '../middlewares'

const router = Router()
const { auth } = middlewares

router.get('/signin', controllers.pages.signIn)

router.get('/signup', controllers.pages.signUp)

router.get('/profile', auth.isUser, controllers.pages.profile)

router.get('/users', auth.isAdmin, controllers.pages.users)

router.get('/task', controllers.pages.task)

router.get('/task/:id', controllers.pages.editTask)

export default router
