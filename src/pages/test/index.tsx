import React, { useEffect, useState, useRef } from 'react'
import { Input, Form, Button, FormProps, Table, TableProps, message, Row, Col } from 'antd'
import { addUser, getUserInfo, getUserList, removeUser } from '@/api/user'
import { type SearchProps } from 'antd/es/input'
import { type UserInfo } from '@/api/user/types'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T: any
  }
}

const T = window.T

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

const TestLodash = () => {
  const mapContainerRef = useRef(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [userForm] = Form.useForm<UserInfo>()
  const tableColumns: TableProps<UserInfo>['columns'] = [
    {
      title: 'userId',
      dataIndex: 'userId'
    },
    {
      title: 'userName',
      dataIndex: 'userName'
    },
    {
      title: 'nickName',
      dataIndex: 'nickName'
    },
    {
      title: 'sex',
      dataIndex: 'sex'
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'deptId',
      dataIndex: 'deptId'
    },
    {
      title: 'deptName',
      dataIndex: 'deptName'
    },
    {
      title: '操作',
      key: 'options',
      render: (record) => (
        <Button type="link" danger onClick={() => handleRemove(record.userId)}>
          删除
        </Button>
      )
    }
  ]
  const [dataSource, setDataSource] = useState<UserInfo[]>([])

  const fetchUserList = () => {
    getUserList({ deptId: '103' }).then((res) => {
      setDataSource(res.data)
    })
  }

  const handleRemove = (userId: string) => {
    removeUser(userId).then(() => {
      messageApi.open({
        content: '删除成功！',
        type: 'success'
      })
      fetchUserList()
    })
  }

  const onFinish: FormProps['onFinish'] = (values) => {
    userForm.validateFields().then(() => {
      addUser(values).then(() => {
        messageApi.open({
          content: '保存成功！',
          type: 'success'
        })
      })
    })
  }

  const initMap = () => {
    if (mapContainerRef.current) {
      const map = new T.Map(mapContainerRef.current)
      map.centerAndZoom(new T.LngLat(116.39, 39.9), 10)
    }
  }

  useEffect(() => {
    fetchUserList()
    initMap()
  }, [])

  return (
    <div>
      {contextHolder}
      <Input.Search placeholder="请输入" onSearch={onSearch} />
      <Form form={userForm} onFinish={onFinish} validateMessages={validateMessages}>
        <Row gutter={[24, 24]}>
          <Col>
            <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="nickName" label="昵称" rules={[{ required: true }]}>
              <Input placeholder="请输入昵称"></Input>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="password" label="登录密码" rules={[{ required: true }]}>
              <Input placeholder="请输入登录密码"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
      <Table columns={tableColumns} dataSource={dataSource} rowKey="userId"></Table>
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }}></div>
    </div>
  )
}

export default TestLodash
