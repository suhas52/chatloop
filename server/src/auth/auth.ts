import jwt from 'jsonwebtoken'
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET: string = String(process.env.JWT_SECRET);

export function verifyToken(req: Request & { user?: Object }, res: Response , next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
}