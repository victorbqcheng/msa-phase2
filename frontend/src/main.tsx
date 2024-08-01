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
import NotFound from './pages/NotFound.tsx'
import ToastProvier from './components/ToastProvider.tsx'



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
      errorElement: <NotFound />,
      children: [
        {
          index: true,
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
      <ToastProvier>
        <RouterProvider router={router} />
      </ToastProvier>
    </ThemeProvider>
  </React.StrictMode>,
)
