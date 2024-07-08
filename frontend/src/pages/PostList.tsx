import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Post } from '../dataTypes';
import axios from 'axios';
import PostListItem from '../components/PostListItem';

const PostList = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const fetchData = async () => {
        const url = 'https://localhost:7247/api/Posts';
        
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
    return (
        <>
            {/* Main Content */}
            < Grid container spacing={2} sx={{ flex: 1, padding: 2, }}>
                {/* Post List */}
                < Grid item xs={8} sx={{}}>
                    <Box sx={{ border: '1px solid #ccc', paddingTop: 2, paddingLeft: 2, paddingRight: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{mb:2}}>Post List</Typography>
                        {posts.map((post, index) => (
                            <PostListItem
                                key={index}
                                title={post.title}
                                description={post.content}
                                author={post.authorName}
                                date={post.createdAt}
                            />
                        ))}
                    </Box>
                </Grid >

                
            </Grid >
        </>
    )
}

export default PostList