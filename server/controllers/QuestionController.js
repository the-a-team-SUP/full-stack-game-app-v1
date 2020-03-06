import QuestionHelper from '../helpers/QuestionHelper';

/**
 * This class contains all methods
 * required to handle
 * game endpoints' request.
 */
class QuestionController {
  /**
   * This method handle the game update request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async retrieveQuestions(req, res) {
    const questions = await QuestionHelper.fetchQuestions();
    if (questions.length < 0) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry! The result can not be saved in system.',
      });
    }

    res.status(200).json({
      status: res.statusCode,
      message: 'The result has been saved successfully.',
      questions,
    });
  }
}

export default QuestionController;
