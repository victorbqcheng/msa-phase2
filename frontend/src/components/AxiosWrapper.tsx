import axios from 'axios';
import { useEffect } from 'react'
import userStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const AxiosWrapper = () => {
    const navigate = useNavigate();

    // Check if token has expired
    const checkTokenExpiry = (token: string): boolean=> {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        return now > expiry;
    }

    useEffect(() => {
        axios.interceptors.request.use((config) => {
            const token = userStore.user?.token;
            if (token) {
                if (checkTokenExpiry(token)) {
                    navigate('/');
                    userStore.setUser(null);
                    return Promise.reject({ message: 'Token expired' });
                }
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }, []);

    return (
        <></>
    )
}

export default AxiosWrapper