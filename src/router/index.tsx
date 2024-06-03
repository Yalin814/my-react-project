import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

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
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]

export const router = createBrowserRouter(constantRoutes)
