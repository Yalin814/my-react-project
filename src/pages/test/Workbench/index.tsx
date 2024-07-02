import { useEffect, useRef } from 'react'
import './index.scss'
import { loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'
import { LoadDepartmentChildrenResp } from '@/api/ccms/evaluate/types'
import { Button } from 'antd'
import blue from '@/assets/images/point.png'
import { LeftOutlined } from '@ant-design/icons'

const MapTest = () => {
  const T = window.T
  let map: typeof T
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({})
  const deptInfo = useRef<LoadDepartmentChildrenResp>({
    id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
    ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
  } as LoadDepartmentChildrenResp)

  console.log(deptInfo.current)

  const initMap = () => {
    if (mapContainerRef.current) {
      map = new T.Map(mapContainerRef.current)
      map.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      map.enableInertia()
      map.enableDrag()
      const control = new T.Control.Zoom()
      map.addControl(control)

      // const parentId = searchParams.get('parentId')
      fetchDepartmentChildren(deptInfo.current.deptId || '')
    }
  }

  const goBack = () => {
    fetchDepartmentChildren(deptInfo.current.parentId || '')
  }

  const addMarker = (dept: LoadDepartmentChildrenResp) => {
    const icon = new T.Icon({
      iconUrl: blue,
      iconSize: new T.Point(19, 25),
      iconAnchor: new T.Point(10, 25)
    })
    const latlng = new T.LngLat(dept.longitude, dept.latitude)
    const marker = new T.Marker(latlng, { icon: icon })
    map.addOverLay(marker)
    const label = new T.Label({
      text: dept.deptDesc,
      position: latlng,
      offset: new T.Point(-40, -40)
    })
    map.addOverLay(label)
    marker.addEventListener('click', () => handleMarkerClick(dept))
  }

  const handleMarkerClick = (dept: LoadDepartmentChildrenResp) => {
    deptInfo.current = dept
    if (dept.deptLevel == 4) {
      map.clearOverLays()
      addMarker(dept)
      map.panTo(new T.LngLat(dept.longitude, dept.latitude), 6)
    } else fetchDepartmentChildren(dept.id)
  }

  const fetchDepartmentChildren = (parentId: string = '') => {
    map.clearOverLays()
    loadDepartmentChildren(parentId)
      .then((res) => {
        if (res.result) {
          res.result
            .concat(...[deptInfo.current])
            .filter((dept) => dept.longitude != null && dept.latitude != null)
            .map((dept) => {
              // const icon = new T.Icon({
              //   iconUrl: blue,
              //   iconSize: new T.Point(19, 25),
              //   iconAnchor: new T.Point(10, 25)
              // })
              // const latlng = new T.LngLat(dept.longitude, dept.latitude)
              // const marker = new T.Marker(latlng, { icon: icon })
              // map.addOverLay(marker)
              // const label = new T.Label({
              //   text: dept.deptDesc,
              //   position: latlng,
              //   offset: new T.Point(-40, -40)
              // })
              // map.addOverLay(label)
              // marker.addEventListener('click', () => handleMarkerClick(dept))
              addMarker(dept)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="workbench-container">
      <div className="map" ref={mapContainerRef}></div>
      <Button onClick={goBack} className="go-back">
        {/* <img
          style={{ width: 14 }}
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M448 440a16 16 0 01-12.61-6.15c-22.86-29.27-44.07-51.86-73.32-67C335 352.88 301 345.59 256 344.23V424a16 16 0 01-27 11.57l-176-168a16 16 0 010-23.14l176-168A16 16 0 01256 88v80.36c74.14 3.41 129.38 30.91 164.35 81.87C449.32 292.44 464 350.9 464 424a16 16 0 01-16 16z'/></svg>"
        /> */}
        <LeftOutlined />
        上级部门
      </Button>
    </div>
  )
}

export default MapTest
