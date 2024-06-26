import { GetProp, Layout, Menu, MenuProps } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.scss'
import { useMemo, useState } from 'react'
import { constantRoutes } from '@/router'
import { NavLink } from 'react-router-dom'
import { MenuType } from '@/types/common'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const Sidebar = () => {
  const [current, setCurrent] = useState('0')
  const [collapsed, setCollapsed] = useState(false)
  const items: MenuItem[] = useMemo(() => {
    return constantRoutes.map((route, index) => ({
      key: index + '',
      icon: <MenuFoldOutlined />,
      label:
        route.children && route.children.length > 0 ? (
          route.handle?.crumb
        ) : route.handle && route.handle.menuType == MenuType.LINK ? (
          <a href={route.path} target="_blank" onClick={(e) => e.stopPropagation()}>
            {route.handle?.crumb}
          </a>
        ) : (
          <NavLink to={route.path}>{route.handle?.crumb}</NavLink>
        ),
      title: route.handle?.crumb,
      path: route.path
    }))
  }, [constantRoutes])

  // const items: MenuItem[] = []
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline')

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key)
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
    // setMode(collapsed ? 'inline' : 'vertical')
  }

  return (
    <Layout.Sider className="layout-sider" collapsible collapsed={collapsed} trigger={null}>
      <div className="layout-sider-title" style={{ display: collapsed ? 'block' : 'flex' }}>
        {!collapsed && <span>平台</span>}
        <MenuFoldOutlined
          style={{ fontSize: '16px', color: 'var(--color-primary)' }}
          onClick={toggleCollapsed}
        />
      </div>
      <Menu items={items} mode={mode} selectedKeys={[current]} onClick={handleClick} />
    </Layout.Sider>
  )
}

export default Sidebar
