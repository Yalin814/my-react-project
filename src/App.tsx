import { useEffect } from 'react'
// import TestLodash from './pages/Test'
import './App.css'
import { ConfigProvider } from 'antd'
import MainLayout from './components/Layout'
import zhCN from 'antd/locale/zh_CN';

function App() {
  useEffect(() => {}, [])

  return (
    <ConfigProvider locale={zhCN}>
      <MainLayout />
    </ConfigProvider>
  )
}

export default App
