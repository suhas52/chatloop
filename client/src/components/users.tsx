import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000

export default function Users() {
    
    const context = useContext(UserContext);
    if (!context) throw new Error("")
        const { user } = context;
    
    const [allUsers, setAllUsers] = useState([{
        first_name: "",
        last_name: "",
        username: ""
    }])
    
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        async function getallUsers () {
            const res = await axios.get(`${BACKEND_URL}:${BACKEND_PORT}/api/user/users`, {
                withCredentials: true
            })
            setAllUsers([...res.data])
            setIsLoading(false)
        }
        
        getallUsers();
        
    }, [])
    
    return (
        <>
        {!isLoading && allUsers.map((user) => (
            <Card
            variant="outlined"
            sx={{
                width: 320,
                
                overflow: 'auto',
                resize: 'horizontal',
            }}
            key={user.username}
            >
            <CardContent>
            <Typography level="title-lg">{user.first_name} {user.last_name}</Typography>
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
    );
}