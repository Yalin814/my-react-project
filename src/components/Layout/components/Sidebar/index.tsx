import { GetProp, Layout, Menu, MenuProps } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.scss'
import { useMemo, useState } from 'react'
import { constantRoutes } from '@/router'
import { NavLink, RouteObject, useLocation } from 'react-router-dom'
import { MenuType } from '@/types/common'

type MenuItem = GetProp<MenuProps, 'items'>[number]

const Sidebar = () => {
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname)
  const [collapsed, setCollapsed] = useState(false)
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline')

  const generateMenu = (routes: RouteObject[]) => {
    return routes.map((route) => {
      return {
        key: route.path,
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
        path: route.path,
        children: route.children && route.children.length > 0 ? generateMenu(route.children) : null
      }
    })
  }

  const items: MenuItem[] = useMemo(() => {
    return generateMenu(constantRoutes[0].children)
  }, [constantRoutes])

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
        {!collapsed && <span>冷链云</span>}
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
