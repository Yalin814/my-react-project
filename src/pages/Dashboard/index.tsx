import { useEffect, useRef } from 'react'
import { Button } from 'antd'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

const Dashboard = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const domRef = useRef(null)

  useEffect(() => {
    console.log(id)
    console.log(searchParams.get('id'))
    console.log(location.state)
    console.log(domRef.current)

    return () => {}
  }, [])

  return (
    <>
      <div ref={domRef}>Test</div>
      <Button />
    </>
  )
}

export default Dashboard
