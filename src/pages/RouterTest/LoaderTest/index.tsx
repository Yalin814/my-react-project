import { Suspense } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Spin } from 'antd'

const LoaderTest = () => {
  const test = useLoaderData()
  return (
    <Suspense fallback={<Spin tip="Loading..." />}>
      <div>{test.age}</div>
    </Suspense>
  )
}

export default LoaderTest
