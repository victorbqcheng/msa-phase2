import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'

import { Post } from '../DataTypes'
import { DeleteOutline, EditOutlined, } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userStore from '../store/userStore'
import { apiUrl } from '../Config'
import stateStore from '../store/stateStore'


const UserProfile = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=>{
        if(!userStore.user){
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
    useEffect(()=>{
        fetchData();
    }, []);

    const onDeleteArticle = (id: string) => {
        const url = apiUrl + `Posts/${id}`;
        axios.delete(url)
            .then(_response => {
                const newPosts = posts.filter(post=>post.id !== id);
                setPosts(newPosts);
                stateStore.setOpenSnackbar(true, "Delete successfully");
            })
            .catch(_error => {
                stateStore.setOpenSnackbar(true, "Failed to delete");
            });
    };

    const onEditArticle = (post: Post) => {
        navigate('/newarticle', {state:post});
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
                    <Button variant='contained' sx={{ mr: 3, height: 40 }} onClick={()=>navigate('/newarticle')}>New Post</Button>
                </Stack>
                {
                    posts.map((post, index) => <PostItem key={index} post={post} onDelete={()=>onDeleteArticle(post.id)} onEdit={()=>onEditArticle(post)} />)
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
};

const PostItem = ({post, onDelete, onEdit}:PostItemProps) => {
    return (
        <Box sx={{ mb: 2, backgroundColor: 'lightgray', p: 1 }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, maxWidth: '80%', justifyContent:'space-around', display:'flex', flexDirection:'column' }}>
                    <Typography variant='h6' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post?.title}</Typography>
                    <Typography variant='body2' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post?.createdAt}</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <IconButton onClick={onDelete}><DeleteOutline /> </IconButton>
                    <IconButton onClick={onEdit}><EditOutlined /> </IconButton>
                </Box>
            </Stack>
        </Box>
    );
};
