import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Breadcrumb from './components/Breadcrumb'

const MainContent = () => {
  return (
    <Layout.Content>
      <Breadcrumb />
      <Outlet />
    </Layout.Content>
  )
}

export default MainContent
