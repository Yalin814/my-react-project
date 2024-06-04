import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UseContextTest from '@/pages/UseContextTest'
import UseImperativeHandleTest from '@/pages/UseImperativeHandleTest'
import Setting from '@/pages/Setting'

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
      },
      {
        path: 'useImperativeHandleTest',
        element: <UseImperativeHandleTest />
      },
      {
        path: 'setting',
        element: <Setting />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]

export const router = createBrowserRouter(constantRoutes)
