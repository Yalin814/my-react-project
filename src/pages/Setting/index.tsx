import { Outlet, useLocation } from 'react-router-dom'
import SystemSetting from './SystemSetting'

const Setting = () => {
  const Home_Page_Path = '/setting'
  const location = useLocation()

  return (
    <>
      {location.pathname === Home_Page_Path && <SystemSetting />}
      <Outlet />
    </>
  )
}

export default Setting
