import {Meta, StoryObj} from '@storybook/react'

import { fn } from '@storybook/test';
import GenerateTitleButton from './GenerateTitleButton';


const meta:Meta<typeof GenerateTitleButton> = {
    component: GenerateTitleButton,
    argTypes:{
        
    },
    args:{
        onClick: fn()
    }
};

export default meta;

type Story = StoryObj<typeof GenerateTitleButton>;

export const Default:Story = {
    args:{
        isThinking: false
    },
    
};

export const Thinking:Story = {
    args:{
        isThinking: true
    }
};
