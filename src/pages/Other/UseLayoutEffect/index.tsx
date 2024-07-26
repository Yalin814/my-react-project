import { useEffect, useLayoutEffect, useState } from 'react'

const UseLayoutEffect = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {}, [])
  useLayoutEffect(() => {
    
  }, [])
  return <>{count}</>
}

export default UseLayoutEffect
