import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const MainContent = () => {
  return (
    <Layout.Content>
      <Outlet />
    </Layout.Content>
  )
}

export default MainContent
