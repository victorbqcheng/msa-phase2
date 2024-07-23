import {Meta, StoryObj} from '@storybook/react'

import { fn } from '@storybook/test';
import LoginDlg from './LoginDlg';


const meta:Meta<typeof LoginDlg> = {
    component: LoginDlg,
    argTypes:{
        
    },
    args:{
        open: false,
        onLogin: fn(),
        onClose: fn()
    }
};

export default meta;

type Story = StoryObj<typeof LoginDlg>;

export const Default:Story = {
    
};

export const Display:Story = {
    args:{
        open: true
    }
};