import bcrypt from 'bcryptjs'
import pool from './pool.ts'
const SALT = 10;

import dotenv from 'dotenv'
dotenv.config();


export const registerUser = async (username: string, password: string, first_name: string, last_name: string) => {
    const hashed_password: string = bcrypt.hashSync(password, SALT);
    await pool.query("INSERT INTO users (username, first_name, last_name, hashed_password) VALUES ($1, $2, $3, $4)", [username, first_name, last_name, hashed_password])
};

export const loginUser = async (username: string, password: string) => {
    const result = await pool.query("SELECT user_id, hashed_password FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    
    const {user_id, hashed_password} = result.rows[0];
    const match = await bcrypt.compare(password, hashed_password)
    if (match) return user_id; else return null;
}

export const getUser = async (user_id: string) => {
    const result = await pool.query("SELECT user_id, username, created_at FROM users");
    return result.rows[0];
}

export const getConversations = async (user_id: string) => {
    const result = await pool.query("SELECT c.conversation_id, c.user1, c.user2, u_sender.username AS user1_username, u_reciever.username AS user2_username FROM conversations c JOIN  users u_sender ON c.user1 = u_sender.user_id JOIN users u_reciever ON c.user2 = u_reciever.user_id WHERE  u_sender.user_id = ($1)", [user_id]);
    const conversations = result.rows;
    console.log(conversations)
}

export const getMessages = async (conversation_id: string) => {
    const result = await pool.query("SELECT msg_id, msg, sent_at, status,sender_id, receiver_id FROM messages WHERE conversation_id = $1", [conversation_id]);
    const messages = result.rows;
    console.log(messages)
}