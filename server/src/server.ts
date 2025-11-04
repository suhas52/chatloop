import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.ts';
import { userRouter } from './routes/userRoutes.ts'
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();

const PORT: number = Number(process.env.EXPRESS_PORT ?? 3000);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


app.listen(PORT, () => {
    console.log("The server was started on port: ", PORT);
})