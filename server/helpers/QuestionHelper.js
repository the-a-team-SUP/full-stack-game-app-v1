import models from '../models';

const { Question } = models;

/**
 * This class contains
 */
class QuestionHelper {
  /**
   * data.
   * @returns {string} The data.
  */
  static async fetchQuestions() {
    const questions = await Question.findAll({ limit: 5 });
    return questions;
  }
}

export default QuestionHelper;
