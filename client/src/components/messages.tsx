import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";
const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';


function Messages({currentConvo}: any) {
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext not found");
    const { user } = context;
    const [cursor, setCursor] = useState(null)
    const [messages, setMessages] = useState([    {
        msg_id: "",
        msg: "",
        sent_at: "",
        status: "",
        sender_id: "",
        receiver_id: "",
        sender_username: "",
        receiver_username: ""
    },])
    
    useEffect(() => {
        async function getMessages() {
    
            const response = await axios.get(`${BACKEND_URL}:${BACKEND_PORT}/api/user/messages/${currentConvo}`, {
                withCredentials: true
            })
            if (response.data.legnth === 0) {
                setMessages([])
            }
            setMessages([...response.data])
        }
        
        getMessages();
    }, [currentConvo])
    
    return (
        <div>
        {messages && messages.map((message) => {
            return <Card
            variant="outlined"
            sx={{
                width: 320,
                
                overflow: 'auto',
                resize: 'horizontal',
            }}
            key={message.msg_id}
            >
            
            <CardContent>
            <Typography level="title-lg">{message.msg}</Typography>
            <Typography level="title-sm">{message.sender_username}</Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
            </CardActions>
            </Card>
        })}
        </div>
    )
}

export default Messages;