import { Router } from 'express';
import { authRoutes } from '../transports/rest/routes';

const router = Router();

router.use('/users', authRoutes);

export { router as routes };