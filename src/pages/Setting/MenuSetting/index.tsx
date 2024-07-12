import {
  Form,
  Select,
  Col,
  Row,
  FormProps,
  Button,
  Input,
  TreeSelect,
  Radio,
  InputNumber
} from 'antd'
import './index.scss'
import { constantRoutes } from '@/router'
import { useMemo } from 'react'
import { RouteObject } from 'react-router-dom'
import { displayTypeKV, menuStatusKV, menuTypeKV } from '@/types/common'

const MenuSetting = () => {
  const handleFinish: FormProps['onFinish'] = (values) => {}

  const generateTreeData = (routes: RouteObject[], prefix: string = '') => {
    return routes.map((route, index) => {
      return {
        value: prefix + index,
        title: route.handle?.crumb,
        children:
          route.children && route.children.length > 0
            ? generateTreeData(route.children, prefix + index + '-')
            : []
      }
    })
  }

  const treeData = useMemo(() => {
    return generateTreeData(constantRoutes)
  }, [constantRoutes])

  return (
    <div className="menu-setting">
      <Form onFinish={handleFinish}>
        <Form.Item label="上级菜单">
          <TreeSelect placeholder="请选择上级菜单" treeData={treeData}></TreeSelect>
        </Form.Item>
        <Form.Item label="菜单名称">
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="菜单路由">
          <Input placeholder="请输入菜单路由" />
        </Form.Item>
        <Form.Item label="组件路径">
          <Input placeholder="请输入组件路径" />
        </Form.Item>
        <Form.Item label="菜单图标">
          <Select placeholder="请选择菜单图标"></Select>
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="菜单类型">
              <Radio.Group optionType="button">
                {Object.keys(menuTypeKV).map((item) => (
                  <Radio value={item}>{menuTypeKV[item]}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="显示排序">
              <InputNumber placeholder="请输入显示排序" min={0}></InputNumber>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="显示状态">
              <Radio.Group optionType="button">
                {Object.keys(displayTypeKV).map((item) => (
                  <Radio value={item}>{displayTypeKV[item]}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="菜单状态">
              <Radio.Group optionType="button">
                {Object.keys(menuStatusKV).map((item) => (
                  <Radio value={item}>{menuStatusKV[item]}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                重置
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default MenuSetting
