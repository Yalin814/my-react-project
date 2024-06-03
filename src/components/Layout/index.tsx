import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './index.scss'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
