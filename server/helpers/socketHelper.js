import ObjectHelper from './transformObejctHelper';
import GameHelper from './gameHelper';
import QuestionHelper from './QuestionHelper';

const socketHelper = (socket) => {
  socket.on('scoreFromClient', (scoreData) => {
    console.log('======score from client=============');
    console.log(scoreData);
    console.log('===================');
    socket.to(scoreData.gameId).broadcast.emit('scoreFromServer', scoreData);
  });

  socket.on('clientEndGame', async (gameResult) => {
    console.log('========clientEndGame===========');
    console.log(gameResult);
    console.log('===================');
    await GameHelper.updateGame(gameResult.id, {
      users: ObjectHelper.toStringifyObject(gameResult.users),
      updatedAt: new Date()
    });
    socket.broadcast.emit('serverEndGame', { ...gameResult, gameStatus: 'done' });
  });

  socket.on('joinRoom', async (game) => {
    console.log('=======game questions==========');
    console.log(game);
    console.log('=======questions ID==========');
    console.log(game.questionIds);
    console.log('=================');
    const questions = await QuestionHelper.fetchQuestionsByIds(game.questionIds);
    console.log('=======questions DATA for client==========');
    console.log(questions);
    console.log('=================');
    // socket.broadcast.to(game.id).emit('QuestionsFromServer', { gameId: game.id, questions });
    socket.broadcast.emit('QuestionsFromServer', { gameId: game.id, questions });
  });
};

export default { socketHelper };
