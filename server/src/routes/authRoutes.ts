import express from 'express'
import { loginUser, registerUser } from '../db/queries.ts';
export const authRouter = express.Router();
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
const JWT_SECRET: string = String(process.env.JWT_SECRET);

authRouter.post("/register", async (req, res) => {
    const {username, password, first_name, last_name} = req.body;
    try {
        await registerUser(username, password, first_name.charAt(0).toUpperCase() + first_name.slice(1), last_name.charAt(0).toUpperCase() + last_name.slice(1));
        res.status(201).json({message: "User added"})
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to add User."})
    }
})

authRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try {
        const user_id = await loginUser(username, password);
        if (user_id) {
            const token = jwt.sign({user_id: user_id, username: username}, JWT_SECRET);
            res.status(200).
            cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })
            .json({ message: "Login successful" });
        } else {
            res.status(400).json({message: "Wrong password"})
        }
    } catch (err) {
        res.status(500).json({message: "Unable to sign in."})
    }
})

authRouter.post("/logout", async (req, res) => {
    res.status(200).
    cookie('token', '', {
        httpOnly: true,
        maxAge: 0
    }).
    json({ message: "Logout Successful" });
})