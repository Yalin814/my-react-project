import { Layout, Button } from 'antd'
import './index.scss'
import Icon from '@/components/Icon'
import screenfull from 'screenfull'
import { useEffect, useState } from 'react'

const Header = () => {
  const [fullScreen, setFullScreen] = useState(false)

  const handleClick = () => {
    console.log('outer link')
    window.open('/setting/systemSetting/commandCenter', '_blank')
  }

  const toggleFullScreen = () => {
    if (!screenfull.isEnabled) {
      // this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
      return false
    }
    screenfull.toggle()
  }

  const syncFullScreen = () => {
    setFullScreen(screenfull.isFullscreen)
  }

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', syncFullScreen)
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', syncFullScreen)
      }
    }
  }, [])

  return (
    <Layout.Header className="layout-header">
      <div></div>
      <div>
        <Icon
          name={fullScreen ? 'cc-fullscreen-exit' : 'cc-fullscreen'}
          style={{ color: '#ffffff', cursor: 'pointer' }}
          onClick={toggleFullScreen}
        ></Icon>
      </div>
      {/* <Button onClick={handleClick}>outer link</Button> */}
    </Layout.Header>
  )
}

export default Header
