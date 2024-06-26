import { Layout, Button } from 'antd'
import './index.scss'

const Header = () => {
  const handleClick = () => {
    console.log('outer link')
    window.open('/setting/systemSetting/commandCenter', '_blank')
  }
  return (
    <Layout.Header className="layout-header">
      <Button onClick={handleClick}>outer link</Button>
    </Layout.Header>
  )
}

export default Header
