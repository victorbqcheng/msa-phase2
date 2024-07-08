import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import About from './pages/About.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children:[
        {
          path: '/',
          element: <Navigate to="/posts" />
        },
        {
          path: '/posts',
          element: <div>posts</div>
        },
        {
          path: '/posts/:id',
          element: <div>post</div>
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
