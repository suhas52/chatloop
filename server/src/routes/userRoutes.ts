import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth.ts';
import { getUser } from '../db/queries.ts';


export const userRouter = express.Router();
userRouter.get("/me", verifyToken, async (req: any, res: Response) => {
    const user = await getUser(req.user.user_id);
    console.log(user)
})

userRouter.get("/conversations", verifyToken, async (req: any, res: Response) => {
    
})