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

  
  const buildGame = (data) => {
    const gameObject = {};
    gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
    gameObject.playerOne = data.name;
    gameObject.playerTwo = null;
    gameObject.open = true;

    const game = GameCollection;
    console.log(`Game Created by ${data.name} w/ ${gameObject.id}`);
    game.totalGameCount += 1;
    game.gameList.push(gameObject);

    io.emit('gameCreated', {
      username: data.name,
      gameId: gameObject.id
    });
  };

  let loopLimit = 0;

  const gameSeeker = (data) => {
    loopLimit += 1;
    if ((GameCollection.totalGameCount === 0) || (loopLimit >= 20)) {
      buildGame(data);
      loopLimit = 0;
    } else {
      const rndPick = Math.floor(Math.random() * GameCollection.totalGameCount);
      if (GameCollection.gameList[rndPick].playerTwo == null) {
        GameCollection.gameList[rndPick].playerTwo = data.name;
        io.emit('joinSuccess', {
          gameId: GameCollection.gameList[rndPick].id
        });

        console.log(`${data.name} has been added to: ${GameCollection.gameList[rndPick].id}`);
      } else {
        gameSeeker(data);
      }
    }
  };

  // when the client  requests to make a Game
  socket.on('makeGame', async (data) => {
    console.log(JSON.stringify(GameCollection));

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

      const saved = await GameHelper.saveGame({users: gameObject.users, questionIds: gameObject.questionIds});
      gameObject.savedGame = saved;

      socket.broadcast.emit('gameCreated', gameObject);
    }
    console.log(JSON.stringify(GameCollection));
  });

  socket.on('joinGame', (data) => {
    console.log(`${data.name} wants to join a game`);
    let alreadyInTheGame = false;

    // eslint-disable-next-line array-callback-return
    GameCollection.gameList.map((game, index) => {
      if (game.playerOne === data.name || game.playerTwo === data.name) {
        alreadyInTheGame = true;
        console.log(`${data.name} already has a Game!`);

        socket.emit('alreadyJoined', {
          gameId: GameCollection.gameList[index].id
        });
      }
    });

    if (alreadyInTheGame === false) {
      gameSeeker(data);
    }
  });
});

export { io };
export default app;
