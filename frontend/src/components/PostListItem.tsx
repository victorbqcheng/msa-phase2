import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'

type PostListItemProps = {
    title: string;
    description: string;
    author: string;
    date: string;
    onClick?: () => void;
};

const PostListItem = ({ title, description, author, date, onClick }: PostListItemProps) => {
    return (
        <Card onClick={onClick} sx={{ marginBottom: 2, cursor: 'pointer' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item >
                        <Avatar />
                    </Grid>

                    <Grid item xs>
                        <Typography variant="h6">{title}</Typography>
                        <div style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {description}
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">author: {author}</Typography>
                            <Typography variant="body2">{date}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PostListItem