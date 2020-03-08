import dotenv from 'dotenv';
import express from 'express';
import serverSocket from 'socket.io';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import GameCollection from './helpers/GameCollection';
import GameHelper from './helpers/gameHelper';
import QuestionHelper from './helpers/QuestionHelper';
import allRoutes from './routes';

dotenv.config();

const app = express();
const basePath = '/api';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/UI', express.static(path.join(__dirname, '../UI')));

app.use(basePath, allRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to The Game' });
});

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: `Not Found`
  });
});

const socketToListen = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  fs.writeFileSync(`${__dirname}/start.log`, 'started');
});

const io = serverSocket(socketToListen);

io.on('connection', (socket) => {
  console.log('socket successfully connected');

  socket.on('realReceipt', (data) => {
    socket.join(data);
  });

  socket.on("new_user_logged_in", (userData) => {
    console.log(userData);
    
    socket.broadcast.emit("logged_in_user", userData);
  });

  // when the client  requests to make a Game
  socket.on('makeGame', async (data) => {
    console.log(JSON.stringify(GameCollection));
    console.log('userID', data.id)

    let noGamesFound = true;

    // eslint-disable-next-line array-callback-return
    GameCollection.gameList.map((game, index) => {
      if (game.users[0].userID === data.id) {
        noGamesFound = false;
        console.log("This User already has a Game!");

        socket.emit('alreadyJoined', {
          gameId: GameCollection.gameList[index]
        });
      }
    });

    if (noGamesFound) {
      const gameObject = {};
      const Qs = await QuestionHelper.fetchQuestions();

      gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
      gameObject.users = [{userId: data.userID, score: 0}];
      gameObject.questionIds = Qs.map(q => q.id);
      gameObject.open = false;

      console.log(gameObject);

      const game = GameCollection;

      console.log(`Game Created by ${data.name} w/ ${gameObject.id}`);
      game.totalGameCount += 1;
      game.gameList.push(gameObject);

      const saved = await GameHelper.saveGame({users: gameObject.users, questionIds: gameObject.questionIds, identifier: gameObject.id});
      gameObject.savedGame = saved;
      socket.broadcast.to(gameObject.id).emit(gameObject.id, gameObject);
      socket.broadcast.emit('gameCreated', gameObject);
    }
    console.log(JSON.stringify(GameCollection));
  });

  socket.on('joinRoom', async (game) =>{
    const gamedb = await GameHelper.fetchGame('identifier', game.id);
    await GameHelper.updateUsers(game.users, gamedb.id);
    socket.join(game.id);
    socket.broadcast.emit('joinSuccess', game);
    socket.broadcast.to(gamedb.identifier).emit('joinSuccess', gamedb);
  });
});

export { io };
export default app;
