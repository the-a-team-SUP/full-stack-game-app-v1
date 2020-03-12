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
   * data.
   * @param {string} users The attribute.
   * @param {string} id The value.
   * @returns {string} The data.
  */
  static async updateUsers(users, id) {
    const updatedUsers = await Game.update({ users }, { where: { id } });
    return updatedUsers;
  }

  /**
   * data.
   * @param {string} game The value.
   * @returns {string} The data.
  */
  static async saveGame(game) {
    const savedGame = await Game.create(
      {
        users: game.users,
        questionIds: game.questionIds,
        identifier: game.identifier,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: [
          'users', 'questionIds', 'identifier', 'createdAt', 'updatedAt'
        ]
      }
    );
    return savedGame;
  }

  /**
   * Update a game.
   * @param {string} identifier The identifier of a game.
   * @param {string} gameData The game data.
   * @returns {object} The user's data about update password.
   */
  static async updateGame(identifier, gameData) {
    const updatedGame = await Game.update(gameData, { where: { identifier } });
    return updatedGame;
  }
}

export default GameHelper;
