import { Outlet } from 'react-router-dom'
// import { Suspense } from 'react'
// import { Spin } from 'antd'

const RouterTest = () => {
  return (
    // <Suspense fallback={<Spin tip="Loading..." fullscreen />}>
    <Outlet />
    // </Suspense>
  )
}
export default RouterTest
