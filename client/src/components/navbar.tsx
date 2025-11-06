
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import { useContext, useState } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const pages = ['users', "notifications"];
const settings = ['Profile', 'Account', 'Logout'];
const BACKEND_URL = "http://localhost"
const BACKEND_PORT = 3000



function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext not found");
    const { user } = context;
    const navigate = useNavigate();

    const handlelogOut = async () => {
        console.log()
        const res = await axios.post(`${BACKEND_URL}:${BACKEND_PORT}/api/auth/logout`, {}, {
            withCredentials: true
        })
        if (res.status === 200) {
            navigate('/login')
        }
    }
    
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    return (
        <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
        >
        LOGO
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        >
        <MenuIcon />
        </IconButton>
        <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
        >
        {pages.map((page) => (
            <MenuItem key={page} onClick={() => navigate(`/${page}`)}>
            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
            </MenuItem>
        ))}
        </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
        >
        LOGO
        </Typography>
        {!user && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end"}}>
        <Stack spacing={2} direction="row">
        <Button href="/login" variant="contained">Login</Button>
        <Button href="/register" variant="contained">Register</Button>
        </Stack>
        </Box>
    }
    
    {user && <>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
            <Button
            key={page}
            onClick={() => navigate(`/${page}`)}
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
            {page}
            </Button>
        ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="#" />
        </IconButton>
        </Tooltip>
        <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        >
        {settings.map((setting) => (
            <MenuItem key={setting} onClick={setting === "Logout" ? handlelogOut : handleCloseNavMenu}>
            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
        ))}
        </Menu>
        </Box>
        </> }
        </Toolbar>
        </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;