import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth.ts';
import { getAllUsers, getConversations, getMessages, getUser, startNewConversation } from '../db/queries.ts';


export const userRouter = express.Router();
userRouter.get("/me", verifyToken, async (req: any, res: Response) => {
    try {
        const user = await getUser(req.user.user_id);
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to fetch user."})
    }
    
})

userRouter.get("/conversations/:id", verifyToken, async (req: any, res: Response) => {
    try {
        const conversations = await getConversations(req.params.id);
        res.status(200).json(conversations)
    } catch (err) {
        console.log(err)
        res.status(400).json({message: "Request failed."})
    }
})

userRouter.get("/messages/:id/:cursor", verifyToken, async (req: any, res: Response) => {
    try { 
        const messages = await getMessages(req.params.id, req.params.cursor)
        res.status(200).json(messages)
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Request failed."})
    }
})

userRouter.get("/users", verifyToken, async (req: any, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Request failed."})
    }
})

userRouter.post("/conversation", verifyToken, async (req: any, res: Response) => {
    const { userA, userB } = req.body;
    try { await startNewConversation(userA, userB);
        res.status(200).json({message: "Successfully created conversation."})
    } catch (err) {
        console.error(err);
        res.status(400).json({message: "Failed to create conversation"})
    }
})