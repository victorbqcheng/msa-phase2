import {Meta, StoryObj} from '@storybook/react'

import GlobalMessage from './GlobalMessage';
import stateStore from '../store/stateStore';
import { ComponentProps } from 'react';

type CustomProps = ComponentProps<typeof GlobalMessage>&{
    message:string;
};

const meta:Meta<CustomProps> = {
    component: GlobalMessage,
    args:{
        message: "default message",
    },
    decorators:[
        (Story, {args:{message}})=>{
            return <button onClick={()=>stateStore.setOpenSnackbar(true, message)}>click me to show message{Story()}</button>
        }
    ],
};

export default meta;

type Story = StoryObj<CustomProps>;

export const Default:Story = {
};