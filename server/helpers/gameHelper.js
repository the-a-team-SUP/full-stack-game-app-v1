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
}

export default GameHelper;
