import React, { useEffect } from 'react'
import { Button } from 'antd'
import { getUserInfo } from '@/api/user'

const TestLodash: React.FC = () => {
  useEffect(() => {
    getUserInfo({
      phone: '1',
      password: '1'
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Button ghost type="primary">
        click
      </Button>
    </div>
  )
}

export default TestLodash
