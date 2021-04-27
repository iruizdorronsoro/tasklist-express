import express from 'express'
import controllers from '../../controllers'

const router = express.Router()

router.post('/signin', controllers.session.router.signin)

router.post('/signout', controllers.session.router.signout)

export default router
