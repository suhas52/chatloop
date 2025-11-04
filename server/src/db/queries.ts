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