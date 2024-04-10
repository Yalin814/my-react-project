import { useEffect } from 'react'
import TestLodash from './pages/test'

import './App.css'

function App() {
  const test = true

  useEffect(() => {
    console.log(`hello world`)
  }, [])

  return <>{test && <TestLodash />}</>
}

export default App
