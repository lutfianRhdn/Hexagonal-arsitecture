
import { Router } from 'express';
import * as authController from '../../../controllers/authController';
const router = Router();

router.get('/users', authController.login);

export { router as authRoutes };