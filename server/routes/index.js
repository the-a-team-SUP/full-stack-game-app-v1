import Router from 'express';
import authRoutes from './fbAuthRoute';

const router = Router();

router.use(authRoutes);

export default router;
