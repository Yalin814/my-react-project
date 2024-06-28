import { CSSProperties, useEffect, useRef, useState } from 'react'
import './index.scss'
import { loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'
import { loadDepartmentChildrenResp } from '@/api/ccms/evaluate/types'
import { Button, Modal } from 'antd'
import TrendChart from './components/TrendChart'

const MapTest = () => {
  let map
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({
    // parentId: 'DE3D6637E277469CA4B2F241CC3035B0'
  })
  const [trendOpen, setTrendOpen] = useState(false)

  let deptInfo = useRef<Partial<loadDepartmentChildrenResp>>({})

  // let deptInfo: Partial<loadDepartmentChildrenResp> = {}

  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    display: 'none',
    top: 0,
    left: 0
  })

  const hideMenu = () => {
    setMenuStyle({
      display: 'none',
      top: 0,
      left: 0
    })
  }

  const initMap = () => {
    if (mapContainerRef.current) {
      map = new T.Map(mapContainerRef.current)
      map.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      // map.enableScrollWheelZoom()
      map.enableInertia()
      // map.enableDoubleClickZoom()
      map.enableDrag()
      const control = new T.Control.Zoom()
      //添加缩放平移控件
      map.addControl(control)
      // map.addContextMenu(menu)

      map.addEventListener('click', hideMenu)
      map.addEventListener('zoomstart', hideMenu)
      map.addEventListener('dragStart', hideMenu)
      map.addEventListener('contextmenu', hideMenu)
      // menu.addEventListener('open', () => {
      //   console.log('menu open')
      // })
      // menu.addEventListener('close', () => {
      //   console.log('menu close')
      // })

      // map.addEventListener('contextmenu', () => {
      // map.removeContextMenu(menu)
      // menu.getItems().map((item) => {
      //   menu.removeItem(item)
      // })
      // menu.getAllSeparator().map((item, i) => {
      //   menu.removeSeparator(i)
      // })
      // console.log(document.getElementsByClassName('.tdt-contextmenu'))
      // document.getElementsByClassName('.tdt-contextmenu')[0].style.display = 'none'
      // })

      const parentId = searchParams.get('parentId')
      fetchDepartmentChildren(parentId || '')
    }
  }

  const goBack = () => {
    fetchDepartmentChildren(deptInfo.parentId || '')
  }

  const handleMarkerClick = (dept: loadDepartmentChildrenResp) => {
    deptInfo = dept
    if (dept.deptLevel == 4) map.setZoomAndCenter(15, new T.LngLat(dept.longitude, dept.latitude))
    else fetchDepartmentChildren(dept.id)
  }

  const handleMarkerRightClick = (dept: loadDepartmentChildrenResp) => {
    deptInfo.current = dept
    console.log(deptInfo)
    console.log('handleMarkerRightClick', dept)
    // menu.getItems().map((item) => {
    //   menu.removeItem(item)
    // })
    // menu.getAllSeparator().map((item, i) => {
    //   menu.removeSeparator(i)
    // })
    // const txtMenuItem = [
    //   {
    //     text: `上传及时率：${32.0}%`
    //   },
    //   {
    //     text: `审核及时率：${32.0}%`
    //   },
    //   {
    //     text: `APP安装率：${32.0}%`
    //   },
    //   {
    //     text: `冷链设备档案表完成率：${32.0}%`
    //   },
    //   {
    //     text: '趋势',
    //     callback: function () {}
    //   }
    // ]

    // for (let i = 0; i < txtMenuItem.length; i++) {
    //   const menuItem = new T.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
    //   menu.addItem(menuItem)
    //   menu.addSeparator()
    // }
    // map.addContextMenu(menu)
  }

  const fetchDepartmentChildren = (parentId: string = '') => {
    map.clearOverLays()
    loadDepartmentChildren(parentId)
      .then((res) => {
        if (res.result) {
          res.result
            .filter((dept) => dept.longitude != null && dept.latitude != null)
            .map((dept) => {
              const icon = new T.Icon({
                iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
                iconSize: new T.Point(19, 27),
                iconAnchor: new T.Point(10, 25)
              })
              const latlng = new T.LngLat(dept.longitude, dept.latitude)
              const marker = new T.Marker(latlng)
              map.addOverLay(marker)
              const label = new T.Label({
                text: dept.deptDesc,
                position: latlng,
                offset: new T.Point(-40, -56)
              })
              map.addOverLay(label)
              marker.addEventListener('click', () => handleMarkerClick(dept))
              marker.addEventListener(
                'contextmenu',
                (e: { containerPoint: { x: number; y: number } }) => {
                  setMenuStyle({
                    display: 'block',
                    left: e.containerPoint.x + 'px',
                    top: e.containerPoint.y - 10 + 'px'
                  })
                  handleMarkerRightClick(dept)
                }
              )
              // const marker = new T.Marker(latlng, { icon: icon })
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const openTrendModal = () => {
    hideMenu()
    setTrendOpen(true)
  }

  const handleCancel = () => {
    setTrendOpen(false)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef}></div>
      <Button onClick={goBack} className="go-back">
        上级部门
      </Button>
      <div className="custom-menu" style={menuStyle}>
        <div>
          上传及时率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div>
          审核及时率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div>
          APP安装率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div>
          冷链设备档案表完成率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={openTrendModal}>趋势</div>
      </div>
      {/* <Modal
        width={780}
        title={deptInfo.current.deptDesc}
        open={trendOpen}
        onCancel={handleCancel}
        footer={null}
      ></Modal> */}
      <TrendChart
        deptId={deptInfo.current.id}
        title={deptInfo.current.deptDesc}
        open={trendOpen}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default MapTest
