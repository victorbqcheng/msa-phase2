import { Meta, StoryObj } from '@storybook/react'
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import userStore from '../store/userStore';
import { Post, User } from '../DataTypes';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../Config';

const user:User = {
    id: 'B347E894-213E-401A-A5DE-69CA7D96F3E9',
    userName: 'victorcheng',
    email: 'email@example.com',
};

const posts:Post[] = [
    {
        id: '1',
        title: 'title1',
        content: 'content2',
        authorName: 'victor',
        createdAt: new Date().toLocaleString()
    },
    {
        id: '2',
        title: 'title2',
        content: 'content2',
        authorName: 'victor',
        createdAt: new Date().toLocaleString()
    },
    {
        id: '3',
        title: 'title3',
        content: 'content3',
        authorName: 'victor',
        createdAt: new Date().toLocaleString()
    }

];

const meta: Meta<typeof UserProfile> = {
    component: UserProfile,
    decorators:[
        (Story)=>{
            useEffect(()=>{
                console.log('setUser');
                userStore.setUser(user);
            }, []);
            return (
                <>
                    <Story />
                </>
            );
        }
    ],
    parameters:{
        msw: {
            handlers:[
                http.get(apiUrl + 'Posts/author/:id', ()=>{
                    return HttpResponse.json(posts, {status:200});
                }),
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
    
};

