import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000

function CurrentConversations() {
    
    const [allConvos, setAllConvos] = useState([{
        conversation_id: "",
        user1: "",
        user1_username: "",
        user2: "",
        user2_username: ""
    }]);

    const context = useContext(UserContext);

    if (!context) throw new Error("")
        const { user } = context;
    
    
    useEffect(() => {
        if (!user) return;
        async function getAllConversations() {
            const res = await axios.get(`${BACKEND_URL}:${BACKEND_PORT}/api/user/conversations/${user?.user_id}`, {
                withCredentials: true,
            })
            const data = res.data;
            setAllConvos([...res.data])
        }

        getAllConversations();
        
    
    }, [user])
    
    return (
        <>
        {allConvos.map((convo) => (
            <Card
            variant="outlined"
            sx={{
                width: 320,
                
                overflow: 'auto',
                resize: 'horizontal',
            }}
            key={convo.user1 === user?.user_id ? convo.user2_username : convo.user1_username}
            >
            <CardContent>
            <Typography level="title-lg">{convo.user1 === user?.user_id ? convo.user2_username : convo.user1_username}</Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
            <FavoriteBorder />
            </IconButton>
            <Button variant="outlined" color="neutral">
            View
            </Button>
            <Button variant="solid" color="primary">
            Text
            </Button>
            </CardActions>
            </Card>
        ))}
        </>
    )
}

export default CurrentConversations;