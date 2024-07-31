import { Box, Button, Container, TextField } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../Config';
import stateStore from '../store/stateStore';
import userStore from '../store/userStore';
import { handleAxiosError } from '../utils/utils';

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const url = apiUrl + "account/register";
        axios.post(url, {username, email, password})
        .then(res => {
            stateStore.setOpenSnackbar(true, "Register successfully");
            userStore.setUser(res.data);
            navigate('/');
        })
        .catch(error => {
            const errMsg = handleAxiosError(error);
            stateStore.setOpenSnackbar(true, "Register failed:" + errMsg);
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