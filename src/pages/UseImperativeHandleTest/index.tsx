import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button } from 'antd'

const UseImperativeHandleTest = () => {
  return <Parent />
}

const Parent = () => {
  const testRef = useRef(null)
  const handleClick = () => {
    if (testRef?.current) testRef.current.test()
  }

  return (
    <div>
      <Child ref={testRef} />
      <Button onClick={handleClick}></Button>
    </div>
  )
}

const Child = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        test: () => {
          console.log('useImperativeHandle test')
        }
      }
    },
    []
  )
  return <div></div>
})

export default UseImperativeHandleTest
