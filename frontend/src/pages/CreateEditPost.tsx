
import React, { FormEvent, useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box
} from '@mui/material';
import axios from 'axios';
import userStore from '../store/userStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../DataTypes';
import { apiUrl } from '../Config';
import stateStore from '../store/stateStore';


const CreateEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            setTitle((location.state as Post).title);
            setContent((location.state as Post).content);
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Submitting:', { title, content });
        if (location.state) {
            // edit, http put
            const url = apiUrl + `Posts/${(location.state as Post).id}`;
            axios.put(url, { id: (location.state as Post).id, title, content, authorId: userStore.user?.id, authorName: userStore.user?.userName, createdAt: (location.state as Post).createdAt })
                .then(_res => {
                    stateStore.setOpenSnackbar(true, "Updated successfully!");
                    navigate('/user/' + userStore.user?.id, { replace: true });
                })
                .catch(_err => {
                    return stateStore.setOpenSnackbar(true, "Failed to update");
                });

        } else {
            // new, http post
            const url = apiUrl + 'Posts';
            axios.post(url, { title, content, authorId: userStore.user?.id, authorName: userStore.user?.userName })
                .then(_res => {
                    stateStore.setOpenSnackbar(true, "Publish successfully!");
                    navigate('/user/' + userStore.user?.id, { replace: true });
                })
                .catch(_err => {
                    return stateStore.setOpenSnackbar(true, "Failed to publish");
                });
        }

    };

    return (
        <>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {location.state ? 'Edit ' : 'Create '}Post
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="title"
                            name="title"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="content"
                            label="content"
                            id="content"
                            multiline
                            rows={12}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type='submit'
                        >
                            {location.state ? 'Update ' : 'Publish '}Post
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default CreateEditPost