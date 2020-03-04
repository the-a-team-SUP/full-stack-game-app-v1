import dotenv from 'dotenv';
import express from 'express';
import serverSocket from 'socket.io';
import GameHelper from './helpers/gameHelper';
import allRoutes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const basePath = '/api';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(basePath, allRoutes);
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: `Not Found`
  });
});

const socketToListen = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

const io = serverSocket(socketToListen);

io.on('connection', (socket) => {
  console.log('socket successfully connected');

  socket.on('realReceipt', (data) => {
    socket.join(data);
  });

  socket.on('user-start-game', async (data) => {
    const userData = {
      userId: data.userId,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.createdAt
    };

    const user = await chatHelper.saveChat(userData);
    if (user) socket.broadcast.emit('server-start-game', data);
  });
});

export { io };
export default app;
