import Router from 'express';
import authRoutes from './fbAuthRoute';
import gameRoutes from './gameRoutes';
import questionRoutes from './questionRoutes';

const router = Router();

router.use(authRoutes);
router.use(gameRoutes);
router.use(questionRoutes);

export default router;
