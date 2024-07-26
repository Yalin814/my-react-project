import { Breadcrumb } from 'antd'
import { NavLink, useLocation, useMatches } from 'react-router-dom'
import './index.scss'

const MainBreadcrumb = () => {
  const matches = useMatches()
  const location = useLocation()

  return (
    <Breadcrumb
      className="layout-breadcrumb"
      items={matches.map((match) => ({
        title:
          match.pathname == location.pathname ? (
            (match.handle as { crumb: string }).crumb
          ) : (
            <NavLink
              to={match.pathname}
              className={({ isActive, isPending }) =>
                isPending ? 'active' : isActive ? '' : 'active'
              }
              end
            >
              {(match.handle as { crumb: string }).crumb}
            </NavLink>
          )
      }))}
    />
  )
}
export default MainBreadcrumb
