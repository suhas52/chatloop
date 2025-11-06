import bcrypt from 'bcryptjs'
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
const SALT = 10;
import dotenv from 'dotenv'
dotenv.config();


export const registerUser = async (username: string, password: string, first_name: string, last_name: string) => {
    const hashed_password: string = bcrypt.hashSync(password, SALT);
    const user = {
        username,
        hashed_password,
        first_name,
        last_name
    }
    await prisma.users.create({ data: user });
    
};

export const loginUser = async (username: string, password: string) => {
    
    const user = await prisma.users.findUnique({
        where: {username},
        select: {
            user_id: true,
            hashed_password: true
        }
    })
    
    if (!user) {
        throw new Error("User not found");
    }
    
    const {user_id, hashed_password} = user;
    const match = await bcrypt.compare(password, hashed_password)
    console.log(match)
    if (match) return user_id; else return null;
}

export const getUser = async (user_id: string) => {
    return prisma.users.findUnique({
        where: { user_id },
        select: {
            user_id: true,
            username: true,
            created_at: true,
        },
    });
}

export const getAllUsers = async () => {
    const users = await prisma.users.findMany({
        select: {
            first_name: true,
            last_name: true,
            username: true
        }
    })
    return users;
}

export const getConversations = async (user_id: string) => {
    const conversations = await prisma.conversations.findMany({
        where: {
            user1: user_id,
        },
        select: {
            conversation_id: true,
            user1: true,
            user2: true,
            users_conversations_user1Tousers: {
                select: {
                    username: true,
                },
            },
            users_conversations_user2Tousers: {
                select: {
                    username: true,
                },
            },
        },
    });
    const flattened = conversations.map(conv => ({
        conversation_id: conv.conversation_id,
        user1: conv.user1,
        user2: conv.user2,
        user1_username: conv.users_conversations_user1Tousers?.username ?? null,
        user2_username: conv.users_conversations_user2Tousers?.username ?? null,
    }));
    
    return flattened;
    
}

export const getMessages = async (conversation_id: string) => {
    const messages = await prisma.messages.findMany({
        orderBy: { sent_at: 'desc' },
        take: 10,
        where: {
            conversation_id: conversation_id
        },
        select: {
            msg_id: true,
            msg: true,
            sent_at: true,
            status: true,
            sender_id: true,
            receiver_id: true,
            users_messages_sender_idTousers: {
                select: { username: true }
            },
            users_messages_receiver_idTousers: {
                select: { username: true }
            }
            
        },
        
    });
    
    const flattened = messages.map(m => ({
        ...m,
        sender_username: m.users_messages_sender_idTousers?.username || null,
        receiver_username: m.users_messages_receiver_idTousers?.username || null,
        users_messages_sender_idTousers: undefined,
        users_messages_receiver_idTousers: undefined
    }));
    
    
    return flattened;
    
}

export const startNewConversation = async (userA: string, userB: string) => {
    const exists = await prisma.conversations.findFirst({
        where: {
            OR: [
                { user1: userA, user2: userB },
                { user1: userB, user2: userA },
            ],
        },
    });
    if (!exists) {
        const conversation = {
            user1: userA, user2: userB
        }
        await prisma.conversations.create({ data: conversation})
    }
}

export const sendMessage = async (msg: string, conversation_id: string, sender_id: string, receiver_id: string) => {
    const message = {
        msg,
        conversation_id,
        sender_id,
        receiver_id
    }
    await prisma.messages.create({ data: message})
}