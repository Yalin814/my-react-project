import { Suspense } from 'react'
import { Await, useAsyncValue, useLoaderData, useSubmit } from 'react-router-dom'
import { Spin, Table, Button } from 'antd'

const Test = () => {
  const user = useAsyncValue()

  return <div>{user.name}</div>
}

const LoaderTest = () => {
  const { user } = useLoaderData()
  const submit = useSubmit()

  const handleClick = () => {
    submit(
      {
        name: 'test',
        age: 18
      }
      // {
      //   method: 'POST',
      //   action: '/test'
      // }
    )
  }

  return (
    <div>
      <h1>Let's test</h1>
      <Button onClick={handleClick}>click</Button>
      <Suspense fallback={<Spin />}>
        <Await resolve={user} errorElement={<div>Error</div>}>
          {/* {(user) => <Table></Table>} */}
          <Test></Test>
        </Await>
      </Suspense>
    </div>
  )
}

export default LoaderTest
