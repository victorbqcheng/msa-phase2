import { Meta, StoryObj } from '@storybook/react'
import ResponsiveAppBar from "./ResponsiveAppBar";
import { fn } from '@storybook/test';
import { Route, Routes } from 'react-router-dom';


const meta: Meta<typeof ResponsiveAppBar> = {
    component: ResponsiveAppBar,
    argTypes: {
        userName: {
            control: 'text'
        }
    },
    args: {
        userName: 'John Doe',
        onClickLogin: fn(),
        onClickRegister: fn(),
        onClickUserProfile: fn(),
        onClickLogout: fn()
    },
    decorators: [
        (Story) => {
            return (
                <>
                    <Story />
                    <div style={{ marginTop: '10px' }}>
                        <Routes>
                            <Route path='/' element={<div>Home</div>} />
                            <Route path='/about' element={<div>About</div>} />
                        </Routes>
                    </div>
                </>
            )
        }
    ],
};

export default meta;

type Story = StoryObj<typeof ResponsiveAppBar>;

export const Default: Story = {
    args: {
        userName: ""
    }
};

export const LogIn: Story = {
    args: {
        userName: "victor"
    }
};
