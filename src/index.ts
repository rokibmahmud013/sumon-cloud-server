/* eslint-disable no-console */
import app from './app/app';
import { mongoUrl, port } from './config';
import { connectMongoDB } from './db/dbConnect';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('joinRoom', userId => {
    socket.join(userId);
    console.log(`User ${userId} joined the room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

(async () => {
  try {
    if (mongoUrl) {
      await connectMongoDB(mongoUrl);
      server.listen(port, () => {
        console.log(`server is running at ${port}`);
      });
    } else {
      console.error('MongoDB URL is not defined.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();
