import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000

function RegisterPage() {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    }) 
    
    const handleChange = (event: ChangeEvent) => {
        const element = event.target as HTMLInputElement
        setFormData({
            ...formData, [element.name]: element.value
        })
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        axios.post(`${BACKEND_URL}:${BACKEND_PORT}/api/auth/register`, formData, {
            headers: { "Content-Type": "application/json" }
        })
         .then(res => {
            console.log(res.data);
            navigate('/login')
         })
         .catch(err => {
            console.log(err)
         })
        
        setFormData({
            username: "",
            password: "",
            first_name: "",
            last_name: ""
        })
    }
    
    return <form onSubmit={handleSubmit}>
    <Box padding={2}
    display={'flex'} 
    justifyContent={'center'} 
    alignItems={'center'} 
    flexDirection={'column'}
    gap={1}
    margin={2}
    border={1}
    borderRadius={2}>
    
    <TextField required onChange={handleChange} value={formData.first_name} name="first_name" label="First Name" />
    <TextField required onChange={handleChange} value={formData.last_name} name="last_name" label="Last Name" />
    <TextField required onChange={handleChange} value={formData.username} name="username" label="Username" />
    <TextField required type='password' onChange={handleChange} name="password" label="Password" />
    <Button type='submit'>Submit</Button>
    </Box>
    </form>
}

export default RegisterPage