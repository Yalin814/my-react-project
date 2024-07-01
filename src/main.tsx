import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/style/index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
)
