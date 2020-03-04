import models from '../models';

const { Game } = models;

class GameHelper{
  static async fetchGame(attr, value) {
    const savedGame = await Game.findOne({ where: { [attr]: value } });
    return savedGame;
  }
}

export default GameHelper;