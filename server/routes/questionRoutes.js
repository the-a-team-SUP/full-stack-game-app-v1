import Router from 'express';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import QuestionController from '../controllers/QuestionController';

const router = Router();

router
  .get(
    '/questions',
    asyncErrorHandler(QuestionController.retrieveQuestions)
  );

export default router;
