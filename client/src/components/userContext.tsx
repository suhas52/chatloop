import axios from "axios";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000

interface User {
  created_at: Date;
  user_id: string;
  username: string;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
    
    const [user, setUser] = useState<User | null>(null);

    
    useEffect(() => {
        axios.get<User>(`${BACKEND_URL}:${BACKEND_PORT}/api/user/me`, {
            withCredentials: true
        })
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}