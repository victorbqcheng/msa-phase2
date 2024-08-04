import { Meta, StoryObj } from '@storybook/react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import CreateEditPost from './CreateEditPost';
import { Post } from '../DataTypes';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../Config';
import ToastProvider from '../components/ToastProvider';



const postData: Post = {
    id: '1',
    title: 'title',
    content: 'content',
    authorName: 'authorName',
    createdAt: new Date().toString()
};

const meta: Meta<typeof CreateEditPost> = {
    component: CreateEditPost,
    parameters: {
        msw: {
            handlers: [
                http.post(apiUrl + 'Posts', () => {
                    return HttpResponse.json(postData, { status: 201 });
                }),
                http.put(apiUrl + 'Posts/:id', () => {
                    return HttpResponse.json(postData, { status: 200 });
                })
            ]
        }
    }
};

export default meta;

type Story = StoryObj<typeof CreateEditPost>;

export const CreatePost: Story = {
    decorators: [
        () => {
            const navigate = useNavigate();
            return (
                <>
                    <ToastProvider>
                        <button onClick={() => navigate('createeditpost')}>click here</button>
                        <Routes>
                            <Route path='createeditpost' element={<CreateEditPost />} />
                        </Routes>
                    </ToastProvider>
                </>
            )
        }
    ]

};

export const EditPost: Story = {
    decorators: [
        () => {
            const navigate = useNavigate();
            return (
                <>
                    <ToastProvider>
                        <button onClick={() => navigate('createeditpost', { state: postData })}>click here</button>
                        <Routes>
                            <Route path='createeditpost' element={<CreateEditPost />} />
                        </Routes>
                    </ToastProvider>
                </>
            )
        }

    ]
};

export const EditPostFailed: Story = {
    parameters: {
        msw: {
            handlers: [
                http.put(apiUrl + 'Posts/:id', () => {
                    return HttpResponse.error();
                })
            ]
        }
    },
    decorators: [
        () => {
            const navigate = useNavigate();
            return (
                <>
                    <ToastProvider>
                        <button onClick={() => navigate('createeditpost', { state: postData })}>click here</button>
                        <Routes>
                            <Route path='createeditpost' element={<CreateEditPost />} />
                        </Routes>
                    </ToastProvider>
                </>
            )
        }

    ]
};

