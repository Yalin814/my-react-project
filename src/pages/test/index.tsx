import React, { useEffect } from 'react'
import { Input, Form, Button, FormProps } from 'antd'
import { addUser, getUserInfo } from '@/api/user'
import { type SearchProps } from 'antd/es/input'
import { type UserInfo } from '@/api/user/types'

const onSearch: SearchProps['onSearch'] = (value) => {
  if (value) fetchUserInfo(value)
}

const fetchUserInfo = (userId: string) => {
  getUserInfo(userId)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

const validateMessages = {
  required: '${label} is required!'
}

const TestLodash: React.FC = () => {
  const [userForm] = Form.useForm<UserInfo>()

  useEffect(() => {}, [])

  const onFinish: FormProps['onFinish'] = (values) => {
    userForm.validateFields().then(() => {
      addUser(values)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return (
    <div>
      <Input.Search placeholder="请输入" onSearch={onSearch} />
      <Form form={userForm} onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名"></Input>
        </Form.Item>
        <Form.Item name="password" label="登录密码" rules={[{ required: true }]}>
          <Input placeholder="请输入登录密码"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TestLodash
