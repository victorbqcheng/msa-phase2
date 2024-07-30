import { Meta, StoryObj } from '@storybook/react'
import Register from './Register';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../Config';

import { User } from '../DataTypes';
import GlobalMessage from '../components/GlobalMessage';

const user:User = {
    id: 'F953EEEE-EF90-4E3C-BF8C-A0F917580227',
    userName: 'John Doe',
    email: 'email',
    token: 'token'
};

const meta: Meta<typeof Register> = {
    component: Register,
    parameters:{
        msw: {
            handlers:[
                http.post(apiUrl + 'account/register', ()=>{
                    console.log("apiUrl", apiUrl)
                    return HttpResponse.json(user, {status:200});
                }),
            ]
        }
    },
    decorators: [
        (Story)=>{
            return (
                <>
                <GlobalMessage />
                <Story />
                </>
            );
        }
    ],
};

export default meta;

type Story = StoryObj<typeof Register>;

export const Default: Story = {
    
};

export const RegisterFailed: Story = {
    parameters:{
        msw: {
            handlers:[
                http.post(apiUrl + 'account/register', ()=>{
                    return HttpResponse.json({userName:"user name is already taken"}, {status:400});
                }),
            ]
        }
    },
};

