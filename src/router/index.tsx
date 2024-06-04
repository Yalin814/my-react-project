import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UseContextTest from '@/pages/UseContextTest'

export const constantRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard/:id',
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'useContextTest',
        element: <UseContextTest />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]

export const router = createBrowserRouter(constantRoutes)
