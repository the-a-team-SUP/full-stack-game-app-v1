import dotenv from 'dotenv';
import express from 'express';
import serverSocket from 'socket.io';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(`${__dirname}/`));
// app.use(express.static(path.join(__dirname, '../UI/html')));
// app.use(basePath, allRoutes);
// app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));


app.get('**', (req, res) => {
  res.status(404).send({
    status: 404,
    error: `Not Found`
  });
});

const socketListen = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

const io = serverSocket(socketListen);

io.on('connection', (socket) => {
  console.log('socket successfully connected');

  socket.on('realReceipt', (data) => {
    socket.join(data);
  });

  socket.on('client-chat-message', async (messageData) => {
    const clientData = {
      userId: messageData.userId,
      message: messageData.message,
      createdAt: messageData.createdAt,
      updatedAt: messageData.createdAt
    };

    const savedChat = await chatHelper.saveChat(clientData);
    if (savedChat) socket.broadcast.emit('server-chat-message', messageData);
  });
});

export { io };
export default app;
