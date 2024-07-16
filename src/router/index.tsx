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
import OLTest from '@/pages/OLTest'
import GDTest from '@/pages/GDTest'
import MenuSetting from '@/pages/Setting/MenuSetting'
import ECMA2024 from '@/pages/Other/ECMA2024'
import Other from '@/pages/Other'
import AbortController from '@/pages/Other/AbortController'
import ClassTest from '@/pages/Other/ClassTest'

const LoaderTest = lazy(() => import('@/pages/RouterTest/LoaderTest/index.tsx'))

const nestingRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    handle: {
      crumb: '平台'
    },
    children: [
      {
        path: '/setting',
        element: <Setting />,
        handle: {
          crumb: '设置'
        },
        children: [
          {
            path: '/setting/systemSetting',
            element: <SystemSetting />,
            handle: {
              crumb: '系统设置'
            }
          },
          {
            path: '/setting/menuSetting',
            element: <MenuSetting />,
            handle: {
              crumb: '菜单管理'
            }
          }
        ]
      },
      {
        path: '/other',
        element: <Other />,
        handle: {
          crumb: '其他'
        },
        children: [
          {
            path: '/other/abortController',
            element: <AbortController />,
            handle: {
              crumb: 'AbortController'
            }
          },
          {
            path: '/other/ECMA2024',
            element: <ECMA2024 />,
            handle: {
              crumb: 'ECMA2024'
            }
          },
          {
            path: '/other/classTest',
            element: <ClassTest />,
            handle: {
              crumb: 'ClassTest'
            }
          }
        ]
      }
    ]
  }
]

export const constantRoutes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <App />,
  //   handle: {
  //     crumb: '冷链云'
  //   },
  //   children: [
  //     {
  //       path: 'olTest',
  //       element: <OLTest />,
  //       handle: {
  //         crumb: 'OLTest'
  //       }
  //     },
  //     {
  //       path: 'gdTest',
  //       element: <GDTest />,
  //       handle: {
  //         crumb: 'GDTest'
  //       }
  //     }
  //     // {
  //     //   path: 'useImmer',
  //     //   element: <UseImmer />,
  //     //   handle: {
  //     //     crumb: 'useImmer'
  //     //   }
  //     // }
  //     // {
  //     //   path: '/workbench',
  //     //   element: <Workbench />,
  //     //   handle: {
  //     //     crumb: '工作台'
  //     //   }
  //     // },
  //     // {
  //     //   path: '/cockpit',
  //     //   element: <Cockpit />,
  //     //   handle: {
  //     //     crumb: '驾驶舱'
  //     //   }
  //     // },
  //     // {
  //     //   path: '/evaluationIndex',
  //     //   element: <EvaluationIndex />,
  //     //   handle: {
  //     //     crumb: '评价指标'
  //     //   }
  //     // }
  //     // {
  //     //   path: 'dashboard/:id',
  //     //   element: <Dashboard />
  //     // },
  //     // {
  //     //   path: 'dashboard',
  //     //   element: <Dashboard />,
  //     //   handle: {
  //     //     crumb: '首页'
  //     //   }
  //     // },
  //     // {
  //     //   path: 'useContextTest',
  //     //   element: <UseContextTest />
  //     // },
  //     // {
  //     //   path: 'useImperativeHandleTest',
  //     //   element: <UseImperativeHandleTest />
  //     // },
  //     // {
  //     //   path: 'setting',
  //     //   element: <Setting />,
  //     //   handle: {
  //     //     crumb: '设置'
  //     //   },
  //     //   children: [
  //     //     {
  //     //       path: 'systemSetting',
  //     //       element: <SystemSetting />,
  //     //       handle: {
  //     //         crumb: '系统设置'
  //     //       }
  //     //     }
  //     //   ]
  //     // }
  //   ]
  // }
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
].concat(nestingRoutes)

export const router = createBrowserRouter(nestingRoutes)
