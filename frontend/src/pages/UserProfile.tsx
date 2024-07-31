import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Container, IconButton, Stack, Typography } from '@mui/material'

import { Post } from '../DataTypes'
import { DeleteOutline, EditOutlined, } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userStore from '../store/userStore'
import { apiUrl } from '../Config'
import stateStore from '../store/stateStore'
import postStore from '../store/postStore'
import { formatDateTime } from '../utils/utils'


const UserProfile = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (!userStore.user) {
            navigate('/');
        }
    }, []);

    const fetchData = async () => {
        const url = apiUrl + `Posts/author/${userStore.user?.id}`;
        axios.get(url)
            .then(response => {
                console.log("response:", response);
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onDeletePost = (id: string) => {
        const url = apiUrl + `Posts/${id}`;
        axios.delete(url)
            .then(_response => {
                const newPosts = posts.filter(post => post.id !== id);
                setPosts(newPosts);
                stateStore.setOpenSnackbar(true, "Delete successfully");
            })
            .catch(_error => {
                stateStore.setOpenSnackbar(true, "Failed to delete");
            });
    };

    const onEditPost = (post: Post) => {
        navigate('/createeditpost', { state: post });
    };
    const onItemClick = (post: Post) => {
        postStore.selectPost(post);
        navigate(`/posts/${post.id}`);
    };

    return (
        <>
            <Container>
                <Stack direction='row' sx={{ m: 2 }}>
                    <Avatar sx={{ width: 56, height: 56 }} />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="body1">{userStore.user?.userName}</Typography>
                        <Typography variant="body2">{userStore.user?.email}</Typography>
                    </Box>
                </Stack>
                <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ m: 2 }}>Post List</Typography>
                    <Button variant='contained' sx={{ mr: 3, height: 40 }} onClick={() => navigate('/createeditpost')}>New Post</Button>
                </Stack>
                {
                    posts.map((post, index) => <PostItem key={index} post={post} onDelete={() => onDeletePost(post.id)} onEdit={() => onEditPost(post)} onClick={()=>onItemClick(post)}/>)
                }
            </Container>
        </>
    )
}

export default UserProfile

type PostItemProps = {
    post?: Post,
    onDelete?: () => void,
    onEdit?: () => void,
    onClick?: () => void,
};

const PostItem = ({ post, onDelete, onEdit, onClick }: PostItemProps) => {
    return (
        <Card sx={{ mb: 2, p: 1 }}>
            <CardContent>
                <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Box onClick={onClick}
                        sx={{flex: 1, maxWidth: '90%', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', cursor:'pointer' }}>
                        <Typography variant='h6' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post?.title}</Typography>
                        <Typography variant='body2' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatDateTime(post?.createdAt)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column' }}>
                        <IconButton onClick={onDelete}><DeleteOutline /> </IconButton>
                        <IconButton onClick={onEdit}><EditOutlined /> </IconButton>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};
