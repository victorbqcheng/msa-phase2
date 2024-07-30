import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Post } from '../DataTypes';

type PostListItemProps = {
    post?: Post;
    onClick?: () => void;
};

const PostListItem = ({ post, onClick }: PostListItemProps) => {
    return (
        <Card onClick={onClick} sx={{ marginBottom: 2, cursor: 'pointer' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item >
                        <Avatar />
                    </Grid>

                    <Grid item xs zeroMinWidth>
                        <Typography variant="h6">{post?.title}</Typography>
                        <div style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {post?.content}
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">author: {post?.authorName}</Typography>
                            <Typography variant="body2">{post?.createdAt}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PostListItem