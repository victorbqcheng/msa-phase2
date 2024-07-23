import { Meta, StoryObj } from '@storybook/react'
import PostList from './PostList';
import { Post } from '../DataTypes';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../Config';

const posts:Post[] = [
    {
        id: '1',
        title: 'title1',
        content: 'content2',
        authorName: 'authorName',
        createdAt: new Date().toLocaleString()
    },
    {
        id: '2',
        title: 'title2',
        content: 'content2',
        authorName: 'authorName',
        createdAt: new Date().toLocaleString()
    },
    {
        id: '3',
        title: 'title3',
        content: 'content3',
        authorName: 'authorName',
        createdAt: new Date().toLocaleString()
    }

];

const meta: Meta<typeof PostList> = {
    component: PostList,
    parameters:{
        msw: {
            handlers:[
                http.get(apiUrl + 'Posts', ()=>{
                    return HttpResponse.json(posts, {status:200});
                }),
            ]
        }
    },
    decorators: [
        
    ],
};

export default meta;

type Story = StoryObj<typeof PostList>;

export const Default: Story = {
    
};

