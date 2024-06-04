import { useEffect } from 'react'
// import TestLodash from './pages/Test'
import './App.css'
import { ConfigProvider } from 'antd'
import MainLayout from './components/Layout'

function App() {
  useEffect(() => {}, [])

  return (
    <ConfigProvider>
      <MainLayout />
    </ConfigProvider>
  )
}

export default App
