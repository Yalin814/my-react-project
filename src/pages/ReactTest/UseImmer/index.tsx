import { useImmer } from 'use-immer'
import { Button } from 'antd'

const UseImmer = () => {
  const [count, setCount] = useImmer({
    count: 0
  })

  const handleClick = () => {
    setCount((draft) => {
      draft.count++
    })
  }

  return (
    <div>
      <div>{count.count}</div>
      <Button onClick={handleClick}>Add</Button>
    </div>
  )
}

export default UseImmer
