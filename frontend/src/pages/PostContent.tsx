import React from 'react'
import { observer } from 'mobx-react-lite'
import postStore from '../store/postStore';
import { Box, Container, Typography } from '@mui/material';

const PostContent = () => {
    return (
        <Container>
            <Box sx={{ marginTop: 5, padding: 5 }}>
                <Typography variant="h4">{postStore.selectedPost?.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Date: {postStore.selectedPost?.createdAt}</Typography>
                </Box>

                <Box sx={{ marginTop: 5 }}>
                    <Typography variant="body1">{postStore.selectedPost?.content}</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default observer(PostContent);