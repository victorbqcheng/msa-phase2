import React from 'react'
import userStore from '../store/userStore'
import { Navigate } from 'react-router-dom';

type AuthProps = {
    children: React.ReactNode
};


const Auth = ({ children }: AuthProps) => {
    if (userStore.user) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <>
            <Navigate to="/" />
        </>
    )
}

export default Auth