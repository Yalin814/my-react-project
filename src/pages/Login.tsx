import { getToken } from '@/api/common'
import { type LoginForm } from '@/api/common/types'
import { Form, Input, Button, FormProps } from 'antd'
import { RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'
import { useNavigate } from 'react-router-dom'

const validateMessages = {
  required: '${label} is required!'
}

const validateUserName = (rule: RuleObject, value: StoreValue) => {
  if (!value) return Promise.reject('请输入用户名')
  else if (value.includes('a')) return Promise.reject('有误')
  else return Promise.resolve()
}

const Login = () => {
  const navigate = useNavigate()
  const [loginForm] = Form.useForm<LoginForm>()

  const onFinish: FormProps['onFinish'] = async (values) => {
    await loginForm.validateFields()
    // getToken(values).then((res) => {
    //   console.log(res)
    // })
    navigate('/dashboard/1', { state: { id: 2 } })
  }

  return (
    <div className="login-form" style={{ margin: 'auto' }}>
      <Form form={loginForm} onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name="userName"
          label="用户名"
          rules={[{ required: true, validator: validateUserName }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
