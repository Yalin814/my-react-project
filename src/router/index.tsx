import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UseContextTest from '@/pages/UseContextTest'
import UseImperativeHandleTest from '@/pages/UseImperativeHandleTest'
import Setting from '@/pages/Setting'
import SystemSetting from '@/pages/Setting/SystemSetting'
import ThreeDemo from '@/pages/ThreeDemo'
import LoadingModel from '@/pages/ThreeDemo/LoadingModel'
import TextureMapping from '@/pages/ThreeDemo/TextureMapping'
import AxisPracticing from '@/pages/ThreeDemo/AxisPracticing'
import RouterTest from '@/pages/RouterTest'
import { lazy } from 'react'
import { MenuType } from '@/types/common'
import EvaluationIndex from '@/pages/Test/EvaluationIndex'
import Cockpit from '@/pages/Test/Cockpit'
import Workbench from '@/pages/Test/Workbench'
import UseImmer from '@/pages/ReactTest/UseImmer'

const LoaderTest = lazy(() => import('@/pages/RouterTest/LoaderTest/index.tsx'))

export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    handle: {
      crumb: '冷链云'
    },
    children: [
      {
        path: 'useImmer',
        element: <UseImmer />,
        handle: {
          crumb: 'useImmer'
        }
      }
      // {
      //   path: '/workbench',
      //   element: <Workbench />,
      //   handle: {
      //     crumb: '工作台'
      //   }
      // },
      // {
      //   path: '/cockpit',
      //   element: <Cockpit />,
      //   handle: {
      //     crumb: '驾驶舱'
      //   }
      // },
      // {
      //   path: '/evaluationIndex',
      //   element: <EvaluationIndex />,
      //   handle: {
      //     crumb: '评价指标'
      //   }
      // }
      // {
      //   path: 'dashboard/:id',
      //   element: <Dashboard />
      // },
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />,
      //   handle: {
      //     crumb: '首页'
      //   }
      // },
      // {
      //   path: 'useContextTest',
      //   element: <UseContextTest />
      // },
      // {
      //   path: 'useImperativeHandleTest',
      //   element: <UseImperativeHandleTest />
      // },
      // {
      //   path: 'setting',
      //   element: <Setting />,
      //   handle: {
      //     crumb: '设置'
      //   },
      //   children: [
      //     {
      //       path: 'systemSetting',
      //       element: <SystemSetting />,
      //       handle: {
      //         crumb: '系统设置'
      //       }
      //     }
      //   ]
      // }
    ]
  }
  // {
  //   path: 'setting/systemSetting/commandCenter',
  //   element: <SystemSetting />,
  //   handle: {
  //     crumb: '指挥中心',
  //     menuType: MenuType.LINK
  //   }
  // },
  // {
  //   path: '/login',
  //   element: <Login />,
  //   handle: {
  //     crumb: '登录'
  //   }
  // },
  // {
  //   path: '/threeDemo',
  //   element: <ThreeDemo />,
  //   children: [
  //     {
  //       path: 'loadingModel',
  //       element: <LoadingModel />
  //     },
  //     {
  //       path: 'textureMapping',
  //       element: <TextureMapping />
  //     },
  //     {
  //       path: 'axisPracticing',
  //       element: <AxisPracticing />
  //     }
  //   ]
  // },
  // {
  //   path: '/routerTest',
  //   element: <RouterTest />,
  //   children: [
  //     {
  //       path: 'loaderTest',
  //       element: <LoaderTest />,
  //       // loader: () => {
  //       //   const user = new Promise((resolve) =>
  //       //     setTimeout(
  //       //       () =>
  //       //         resolve({
  //       //           name: 'test',
  //       //           age: 18
  //       //         }),
  //       //       2000
  //       //     )
  //       //   )
  //       //   return defer({
  //       //     user
  //       //   })
  //       // }
  //       loader: async () => {
  //         const loaderModule = await import('@/pages/RouterTest/LoaderTest/useLoader.ts')
  //         const loaderFunc = loaderModule.default
  //         return loaderFunc()
  //       },
  //       action: async () => {
  //         const loaderModule = await import('@/pages/RouterTest/LoaderTest/useAction.ts')
  //         const loaderFunc = loaderModule.default
  //         return loaderFunc
  //       }
  //     }
  //   ]
  // }
]

export const router = createBrowserRouter(constantRoutes)
