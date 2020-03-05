import models from '../models';

const { Game } = models;

/**
 * This class contains
 */
class GameHelper {
  /**
   * data.
   * @param {string} attr The attribute.
   * @param {string} value The value.
   * @returns {string} The data.
  */
  static async fetchGame(attr, value) {
    const savedGame = await Game.findOne({ where: { [attr]: value } });
    return savedGame;
  }

  /**
   * Update a game.
   * @param {string} id The id of a game.
   * @param {string} gameData The game data.
   * @returns {object} The user's data about update password.
   */
  static async updateGame(id, gameData) {
    const updatedGame = await Game.update(gameData, { where: { id } });
    return updatedGame;
  }
}

export default GameHelper;
