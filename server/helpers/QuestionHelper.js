import { Sequelize } from 'sequelize';
import models from '../models';
import ArrayHelper from './ArrayHelper';

const { Question } = models;
const { Op } = Sequelize;

/**
 * This class contains
 */
class QuestionHelper {
  /**
   * data.
   * @returns {string} The data.
  */
  static async fetchQuestions() {
    let questions = await Question.findAll();
    questions = ArrayHelper.randomArray(questions);
    return questions;
  }

  /**
   * data.
   * @param {string} array The value.
   * @returns {string} The data.
  */
  static async fetchQuestionsByIds(array) {
    const questions = await Question.findAll({ where: { id: { [Op.in]: array } } });
    return questions;
  }
}

export default QuestionHelper;
