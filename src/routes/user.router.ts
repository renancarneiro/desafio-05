import { Router } from 'express'
import UserController from '../app/controller/UserController'

const router = Router()

router.post('/api/v1/user', UserController.create)
router.post('/api/v1/authenticate', UserController.authenticate)
router.get('/api/v1/user', UserController.get)
router.patch('/api/v1/user/:id', UserController.update)
router.delete('/api/v1/user/:id', UserController.delete)

export default router
