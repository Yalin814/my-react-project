import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Layout } from 'antd'
import MainContent from './components/MainContent'
import './index.less'

const MainLayout: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Header />
      <Layout>
        <Sidebar />
        <MainContent />
      </Layout>
    </Layout>
  )
}

export default MainLayout
