import { Meta, StoryObj } from '@storybook/react'
import PostContent from './PostContent';
import { ComponentProps, useEffect } from 'react';
import postStore from '../store/postStore';
import { Post } from '../DataTypes';

const postData:Post = {
    id: '1',
    title: 'title',
    content: 'content',
    authorName: 'authorName',
    createdAt: new Date().toLocaleString()
};

type CustomProps = ComponentProps<typeof PostContent>&{
    post:Post
};

const meta: Meta<CustomProps> = {
    component: PostContent,
    args:{
        post:postData
    },
    decorators: [
        (Story, {args:{post}}) => {
            useEffect(() => {
                postStore.selectPost(post);
            }, [post]);
            return (
                <>
                    <Story />
                </>
            )
        }
    ]
};

export default meta;

type Story = StoryObj<typeof PostContent>;

export const Default: Story = {
    
};