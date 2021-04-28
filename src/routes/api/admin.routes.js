import { Router } from 'express'
import middlewares from "../../middlewares";
import controllers from "../../controllers";

const router = Router()
const { auth } = middlewares
const { api } = controllers

router.post('/deleteuser/:id', auth.verifySession,  auth.isAdmin, api.admin.deleteUser)

export default router
