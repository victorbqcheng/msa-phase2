import { Meta, StoryObj } from '@storybook/react'
import ToastProvider, { useToast } from './ToastProvider';
import { ComponentProps } from 'react';


const Comp = ({message}:{message:string})=>{
    const {showToast} = useToast();
    return (
        <button onClick={()=>showToast(message) }>click here</button>
    )
};

type CustomProps = ComponentProps<typeof ToastProvider>&{
    message:string;
};

const meta: Meta<CustomProps> = {
    component: ToastProvider,
    args:{
        message:"default message",
    },
    decorators:[
        (_, {args:{message}}) => {
            return (
                <>
                    <ToastProvider>
                        <Comp message={message}/>
                    </ToastProvider>
                </>
            )
        }
    ]
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
    
};
