import Router from 'express';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import GameController from '../controllers/GameController';

const router = Router();

router
  .patch(
    '/games/:gameId/update',
    asyncErrorHandler(GameController.saveGameResult)
  );

export default router;
