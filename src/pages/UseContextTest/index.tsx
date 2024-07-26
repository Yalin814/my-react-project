import { createContext, useContext, useState } from 'react'
import { Button } from 'antd'

const UseContextTest = () => {
  return <Ancestor />
}

const TestContext = createContext({
  fontSize: 16,
  color: 'blue'
})

const Ancestor = () => {
  const [theme, setTheme] = useState({
    fontSize: 16,
    color: 'blue'
  })

  const toggleTheme = () => {
    setTheme(
      theme.color === 'blue'
        ? {
            fontSize: 24,
            color: 'green'
          }
        : {
            fontSize: 16,
            color: 'blue'
          }
    )
  }

  return (
    <TestContext.Provider value={theme}>
      <Descendant />
      <Button onClick={toggleTheme}>toggle</Button>
    </TestContext.Provider>
  )
}

const Descendant = () => {
  const test = useContext(TestContext)
  return <div style={test}>useContext test</div>
}

export default UseContextTest
