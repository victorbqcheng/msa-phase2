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

axios.interceptors.request.use((config)=>{
  const token = userStore.user?.token;
  if(token){
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
