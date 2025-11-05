import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth.ts';
import { getAllUsers, getConversations, getMessages, getUser, startNewConversation } from '../db/queries.ts';
import { start } from 'repl';


export const userRouter = express.Router();
userRouter.get("/me", verifyToken, async (req: any, res: Response) => {
    const user = await getUser(req.user.user_id);
    console.log(user)
})

userRouter.get("/conversations/:id", verifyToken, async (req: any, res: Response) => {
    getConversations(req.params.id)
})

userRouter.get("/messages/:id", verifyToken, async (req: any, res: Response) => {
    getMessages(req.params.id)
})

userRouter.get("/users", verifyToken, async (req: any, res: Response) => {
    getAllUsers();
})

userRouter.post("/conversation", verifyToken, async (req: any, res: Response) => {
    const { userA, userB } = req.body;

    startNewConversation(userA, userB);
})