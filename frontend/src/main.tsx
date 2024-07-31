import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import About from './pages/About.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import PostList from './pages/PostList.tsx'
import PostContent from './pages/PostContent.tsx'
import Register from './pages/Register.tsx'
import UserProfile from './pages/UserProfile.tsx'
import CreateEditPost from './pages/CreateEditPost.tsx'
import Auth from './pages/Auth.tsx'
import axios from 'axios'
import userStore from './store/userStore.ts'

// Check if token has expired
function checkTokenExpiry(token:string):boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);
  return now > expiry;
}

axios.interceptors.request.use((config)=>{
  const token = userStore.user?.token;
  if(token){
    if(checkTokenExpiry(token)){
      alert('Token expired');
      window.location.href = '/';
      userStore.setUser(null);
      return Promise.reject({message: 'Token expired'});
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
  }
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Navigate to="/posts" />
        },
        {
          path: '/posts',
          element: <PostList />
        },
        {
          path: '/posts/:id',
          element: <PostContent />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/user/:id',
          element: <Auth><UserProfile /></Auth>
        },
        {
          path: '/createeditpost',
          element: <Auth><CreateEditPost /></Auth>
        },
        {
          path: '/about',
          element: <About />
        }
      ]
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
