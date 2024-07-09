import { Box, Button, Container, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar';
// import userStore from '../store/user.Store';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../Config';
import stateStore from '../store/stateStore';

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const url = apiUrl + "account/register";
        axios.post(url, {username, email, password})
        .then(_res => {
            stateStore.setOpenSnackbar(true, "Register successfully");
            navigate('/');
        })
        .catch(_err => {
            stateStore.setOpenSnackbar(true, "Registration failed");
        })
    };
    return (
        <>  
            <Container maxWidth="xs" sx={{mt:10}}>
                
                <Box component="form" onSubmit={onSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2}}
                        type='submit'
                    >
                        Register
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Register