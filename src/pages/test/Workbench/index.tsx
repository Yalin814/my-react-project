import { useEffect, useRef, useState } from 'react'
import './index.scss'
import { loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'
import { LoadDepartmentChildrenResp } from '@/api/ccms/evaluate/types'
import { Button, Spin } from 'antd'
import blue from '@/assets/images/point.png'
import { LeftOutlined } from '@ant-design/icons'

const MapTest = () => {
  const T = window.T
  const map = useRef<typeof T>()
  const mapContainerRef = useRef(null)
  const [spinning, setSpinning] = useState(true)
  const [searchParams] = useSearchParams({})
  const deptInfo = useRef<LoadDepartmentChildrenResp>({
    id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
    ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
  } as LoadDepartmentChildrenResp)
  const deptStack = useRef<LoadDepartmentChildrenResp[]>([
    {
      id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
      ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
    } as LoadDepartmentChildrenResp
  ])

  const initMap = () => {
    if (mapContainerRef.current) {
      map.current = new T.Map(mapContainerRef.current)
      map.current.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      map.current.enableInertia()
      map.current.enableDrag()
      const control = new T.Control.Zoom()
      map.current.addControl(control)

      // const parentId = searchParams.get('parentId')
      if (deptStack.current && deptStack.current.length > 0)
        fetchDepartmentChildren(deptStack.current[deptStack.current.length - 1].id)
    }
  }

  const goBack = () => {
    if (deptStack.current && deptStack.current.length > 1) {
      deptStack.current.pop()
      fetchDepartmentChildren(deptStack.current[deptStack.current.length - 1].id)
    }
  }

  const addMarker = (dept: LoadDepartmentChildrenResp) => {
    const icon = new T.Icon({
      iconUrl: blue,
      iconSize: new T.Point(19, 25),
      iconAnchor: new T.Point(10, 25)
    })
    const latlng = new T.LngLat(dept.longitude, dept.latitude)
    const marker = new T.Marker(latlng, { icon: icon })
    map.current.addOverLay(marker)
    const label = new T.Label({
      text: dept.deptDesc,
      position: latlng,
      offset: new T.Point(-40, -40)
    })
    map.current.addOverLay(label)
    marker.addEventListener('click', () => handleMarkerClick(dept))
  }

  const handleMarkerClick = (dept: LoadDepartmentChildrenResp) => {
    const i = deptStack.current.findIndex((item) => item.id == dept.id)
    if (i == -1) deptStack.current.push(dept)
    else return
    if (dept.hasChild == '0') {
      map.current.clearOverLays()
      addMarker(dept)
      map.current.panTo(new T.LngLat(dept.longitude, dept.latitude), 6)
    } else {
      setSpinning(true)
      fetchDepartmentChildren(dept.id)
    }
  }

  const fetchDepartmentChildren = (parentId: string = '') => {
    map.current.clearOverLays()
    loadDepartmentChildren(parentId)
      .then((res) => {
        if (res.result) {
          const data = res.result
            .concat([deptStack.current[deptStack.current.length - 1]])
            .filter((dept) => dept.longitude != null && dept.latitude != null)
          map.current.setViewport(data.map((item) => new T.LngLat(item.longitude, item.latitude)))
          data.map((dept) => {
            addMarker(dept)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setSpinning(false)
      })
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="workbench-container">
      <Spin spinning={spinning} tip="Loading...">
        <div className="map" ref={mapContainerRef}>
          <Button onClick={goBack} className="go-back">
            <LeftOutlined />
            上级部门
          </Button>
        </div>
      </Spin>
    </div>
  )
}

export default MapTest
