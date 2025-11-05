import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.ts';
import { userRouter } from './routes/userRoutes.ts'
import cookieParser from 'cookie-parser'
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { sendMessage } from './db/queries.ts';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.EXPRESS_PORT ?? 3000);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  
  socket.on('message', (data) => {
    const {msg, conversation_id, receiver_id, sender_id} = data;
    sendMessage(msg, conversation_id, receiver_id, sender_id);
    io.to(data.conversation_id).emit('newMessage', data);
  });
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});