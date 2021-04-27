import { Router } from 'express'
import controllers from '../controllers'
import middlewares from '../middlewares'

const router = Router()
const { auth, user } = middlewares

router.get('/', (req, res) => {
	res.redirect('/signin')
})

router.get('/signin', controllers.pages.signIn)

router.get('/signup', controllers.pages.signUp)

router.get('/profile', auth.verifySession, auth.isUser, controllers.pages.profile)

router.get('/users', auth.verifySession, auth.isAdmin, controllers.pages.users)

router.get('/tasks', auth.verifySession, controllers.pages.tasks)

router.get('/task', controllers.pages.task)

router.get('/task/:id', controllers.pages.editTask)

export default router
