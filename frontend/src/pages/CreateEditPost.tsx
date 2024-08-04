
import { FormEvent, useEffect, useState } from 'react';
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
import GenerateTitleButton from '../components/GenerateTitleButton';
import { handleAxiosError } from '../utils/utils';
import { useToast } from '../components/ToastProvider';


const CreateEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {showToast} = useToast();

    useEffect(() => {
        if (location.state) {
            setTitle((location.state as Post).title);
            setContent((location.state as Post).content);
        }
    }, []);

    const onGenerateTitle = () => {
        const url = apiUrl + 'Posts/title';
        setIsThinking(true);
        axios.post(url, {content})
        .then(_res=>{
            setIsThinking(false);
            setTitle(_res.data);
        })
        .catch(_err=>{
            setIsThinking(false);
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        if (location.state) {
            // edit, http put
            const url = apiUrl + `Posts/${(location.state as Post).id}`;
            axios.put(url, { id: (location.state as Post).id, title, content, authorId: userStore.user?.id, authorName: userStore.user?.userName, createdAt: (location.state as Post).createdAt })
                .then(_res => {
                    showToast("Updated successfully!");
                    navigate('/user/' + userStore.user?.id, { replace: true });
                })
                .catch(error => {
                    const errMsg = handleAxiosError(error);
                    showToast("Failed to update:" + errMsg);
                });

        } else {
            // new, http post
            const url = apiUrl + 'Posts';
            axios.post(url, { title, content, authorId: userStore.user?.id, authorName: userStore.user?.userName })
                .then(_res => {
                    showToast("Publish successfully!");
                    navigate('/user/' + userStore.user?.id, { replace: true });
                })
                .catch(error => {
                    const errMsg = handleAxiosError(error);
                    showToast("Failed to publish:" + errMsg);
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
                            InputProps={{
                                endAdornment: content && !title ? <GenerateTitleButton onClick={onGenerateTitle} isThinking={isThinking}/> :null
                            }}
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