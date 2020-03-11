import dotenv from 'dotenv';
import express from 'express';
import serverSocket from 'socket.io';
import passport from 'passport';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import GameCollection from './helpers/GameCollection';
import GameHelper from './helpers/gameHelper';
import QuestionHelper from './helpers/QuestionHelper';
import "./middlewares/fbStrategy";
import allRoutes from './routes';

dotenv.config();

const app = express();
const basePath = '/api';

app.use(passport.initialize());
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

io.sockets.on('connection', (socket) => {
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
    console.log('userID', data.userId);
    let noGamesFound = true;
    console.log("Current ID: ",GameCollection.totalGameCount)
    // if(GameCollection.totalGameCount > 0) {
    //   GameCollection.gameList.map( async (game, index) => {
    //     const dbgame = await GameHelper.fetchGame('identifier', game.id)
    //     console.log(dbgame.users)
    //     console.log(game.users)
    //     if(JSON.parse(dbgame.users) === game.users) {
    //       noGamesFound = false;
    //       console.log("This User already has a Game!", noGamesFound);
    //       socket.emit('alreadyJoined', 'Hahaha');
    //     }
    //   })
    // }

    setTimeout(async () => {
      if(noGamesFound) {
        const gameObject = {};
        const Qs = await QuestionHelper.fetchQuestions();
  
        gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
        gameObject.users = [{ userId: data.userID, score: 0 }];
        gameObject.questionIds = Qs.map((q) => q.id);
  
        console.log(`Game Created by ${data.name} with ID ${gameObject.id}`);
        GameCollection.totalGameCount += 1;
        GameCollection.gameList.push(gameObject);
        console.log(noGamesFound)
  
        await GameHelper.saveGame({ users: gameObject.users, questionIds: gameObject.questionIds, identifier: gameObject.id });
        socket.join(gameObject.id);
        socket.broadcast.to(gameObject.id).emit(gameObject.id, gameObject);
        socket.broadcast.emit('gameCreated', gameObject);
        console.log(gameObject)
      }
    }, 1000);
    console.log(JSON.stringify(GameCollection));
  });

  socket.on('joinRoom', async (game) => {
    let noGamesFound = true;
    console.log('Actual game', game.users)
    const gamedb = await GameHelper.fetchGame('identifier', game.id);
    // if(gamedb) {
    //   gamedb.users.map((uu, index) => {
    //     const user = JSON.parse(uu);
    //     if (user.userId === game.users[game.users.length - 1].userId) {
    //       console.log(user.userId, game.users[game.users.length - 1].userId)
    //       noGamesFound = false;
    //       console.log("This User already has a Game!");
    //       socket.emit('alreadyJoined');
    //     }
    //     // game.users.map((u) => {
    //     //   if (user.userId === u.userId) {
    //     //     console.log(user.userId, u.userId)
    //     //     noGamesFound = false;
    //     //     console.log("This User already has a Game!");
    //     //     socket.emit('alreadyJoined');
    //     //   }
    //     // })
    //   });
    // }

    setTimeout(async () => {
      if (noGamesFound) {
        const gamedb = await GameHelper.fetchGame('identifier', game.id);
        await GameHelper.updateUsers(game.users, gamedb.id);
        socket.broadcast.emit('joinSuccess', game);
        socket.join(gamedb.identifier);
        socket.broadcast.to(gamedb.identifier).emit('joinSuccess', gamedb);
      }
    }, 1000)
  });

  socket.on('join-room', (id) => {
    socket.broadcast.emit('redirect', id);
  })
});

export { io };
export default app;
