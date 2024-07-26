import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Breadcrumb from './components/Breadcrumb'
import './index.scss'

const MainContent = () => {
  return (
    <Layout.Content className="layout-content">
      <Breadcrumb />
      <div className="layout-main-content">
        <Outlet />
      </div>
    </Layout.Content>
  )
}

export default MainContent
