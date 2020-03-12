import ObjectHelper from './transformObejctHelper';
import GameHelper from './gameHelper';
import QuestionHelper from './QuestionHelper';

const socketHelper = (socket) => {
  socket.on('scoreFromClient', (scoreData) => {
    socket.to(scoreData.gameId).broadcast.emit('scoreFromServer', scoreData);
  });

  socket.on('clientEndGame', async (gameResult) => {
    await GameHelper.updateGame(gameResult.id, {
      users: ObjectHelper.toStringifyObject(gameResult.users),
      updatedAt: new Date()
    });
    socket.broadcast.emit('serverEndGame', { ...gameResult, gameStatus: 'done' });
  });

  socket.on('joinRoom', async (game) => {
    const questions = await QuestionHelper.fetchQuestionsByIds(game.questionIds);
    // socket.broadcast.to(game.id).emit('QuestionsFromServer', { gameId: game.id, questions });
    socket.broadcast.emit('QuestionsFromServer', { gameId: game.id, questions });
  });
};

export default { socketHelper };
