import { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test';
import PostListItem from './PostListItem';


const meta: Meta<typeof PostListItem> = {
    component: PostListItem,
    argTypes: {
        post: {
            control: 'object'
        }
    },
    args: {
        post: {
            id: '1',
            title: 'Title',
            content: 'Content',
            authorName: 'John Doe',
            createdAt: new Date().toLocaleString()
        },
        onClick: fn()
    }
};

export default meta;

type Story = StoryObj<typeof PostListItem>;
export const Default: Story = {

};


