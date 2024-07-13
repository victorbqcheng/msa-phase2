import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios';
import PostListItem from '../components/PostListItem';
import { Post } from '../DataTypes';
import { apiUrl } from '../Config';
import { useNavigate } from 'react-router-dom';
import postStore from '../store/postStore';

const PostList = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const url =  apiUrl + 'posts';
        
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

    const onItemClick = (post: Post) => {
        postStore.selectPost(post);
        navigate(`/posts/${post.id}`, { state: post });
    };

    return (
        <>
            {/* Main Content */}
            < Grid container spacing={2} sx={{ borderBottom:'1px solid #ccc', flex: 1, padding: 2, }}>
                {/* Post List */}
                < Grid item xs={8} sx={{}}>
                    <Box sx={{ border: '1px solid #ccc0', paddingTop: 2, paddingLeft: 2, paddingRight: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{mb:2}}>Post List</Typography>
                        {posts.map((post, index) => (
                            <PostListItem
                                key={index}
                                post={post}
                                onClick={() => onItemClick(post)}
                            />
                        ))}
                    </Box>
                </Grid >

                
            </Grid >
        </>
    )
}

export default PostList