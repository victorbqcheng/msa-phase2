import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import PostListItem from '../components/PostListItem';
import { Post } from '../DataTypes';
import { apiUrl } from '../Config';
import { useNavigate } from 'react-router-dom';
import postStore from '../store/postStore';
import stateStore from '../store/stateStore';
import { handleAxiosError } from '../utils/utils';

const PostList = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const url = apiUrl + 'posts';

        try {
            const response = await axios.get(url);
            const posts = response.data;
            setPosts(posts);
        } catch (error) {
            const errMsg = handleAxiosError(error as AxiosError);
            stateStore.setOpenSnackbar(true, errMsg);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onItemClick = (post: Post) => {
        postStore.selectPost(post);
        navigate(`/posts/${post.id}`, { state: post });
    };

    return (
        <>
            <Container sx={{ borderBottom: '1px solid #ccc', flex: 1, padding: 2, }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Post List</Typography>
                {posts.map((post, index) => (
                    <PostListItem
                        key={index}
                        post={post}
                        onClick={() => onItemClick(post)}
                    />
                ))}
            </Container>
        </>
    )
}

export default PostList