import GameHelper from '../helpers/gameHelper';

/**
 * This class contains all methods
 * required to handle
 * game endpoints' request.
 */
class GameController {
  /**
   * This method handle the game update request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async saveGameResult(req, res) {
    const { gameId } = req.params;
    const dummyGame2 = {
      users: [
        JSON.stringify({
          userId: 1,
          score: 50
        }),
        JSON.stringify({
          userId: 2,
          score: 40
        }),
        JSON.stringify({
          userId: 3,
          score: 30
        }),
        JSON.stringify({
          userId: 4,
          score: 20
        }),
        JSON.stringify({
          userId: 5,
          score: 10
        })
      ],
      questionIds: [6, 2, 15, 4, 12],
      updatedAt: new Date()
    };

    req.body = dummyGame2;
    const gameExist = await GameHelper.fetchGame('id', gameId);
    if (!gameExist) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry! The result can not be saved in system.',
      });
    }

    await GameHelper.updateGame(gameId, req.body);

    res.status(200).json({
      status: res.statusCode,
      message: 'The result has been saved successfully.',
      gameId
    });
  }
}

export default GameController;
