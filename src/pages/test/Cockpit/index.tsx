import { LoadCabDeptChildResp } from '@/api/ccms/cab/types'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './index.scss'
import { loadCabDeptChild } from '@/api/ccms/cab'
import RealTimeData from './components/RealTimeData'
import blue from '@/assets/images/point.png'
import red from '@/assets/images/point10.png'

const Cockpit = () => {
  const T = window.T
  let map: typeof T
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({})
  const [modalOpen, setModalOpen] = useState(false)
  const deptInfo = useRef<Partial<LoadCabDeptChildResp>>({})

  const initMap = () => {
    if (mapContainerRef.current) {
      map = new T.Map(mapContainerRef.current)
      map.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      map.enableInertia()
      map.enableDrag()
      const control = new T.Control.Zoom()
      map.addControl(control)

      const parentId = searchParams.get('parentId')
      fetchCabDeptChild(parentId || '')
    }
  }

  const handleMarkerClick = (dept: LoadCabDeptChildResp) => {
    deptInfo.current = dept
    setModalOpen(true)
  }

  const fetchCabDeptChild = (parentId: string = '') => {
    map.clearOverLays()
    loadCabDeptChild(parentId)
      .then((res) => {
        if (res.result) {
          res.result
            .filter((dept) => dept.longitude != null && dept.latitude != null)
            .map((dept) => {
              const latlng = new T.LngLat(dept.longitude, dept.latitude)
              const icon = new T.Icon({
                iconUrl: dept.abnormalCount == 0 ? blue : red,
                iconSize: new T.Point(19, 25),
                iconAnchor: new T.Point(10, 25)
              })
              const marker = new T.Marker(latlng, { icon: icon })
              map.addOverLay(marker)
              const label = new T.Label({
                text: dept.deptDesc,
                position: latlng,
                offset: new T.Point(-40, -40)
              })
              marker.addEventListener('click', () => handleMarkerClick(dept))
              marker.addEventListener('mouseover', () => {
                map.addOverLay(label)
              })
              marker.addEventListener('mouseout', () => {
                map.removeOverLay(label)
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="cockpit-container">
      <div className="map" ref={mapContainerRef}></div>
      {modalOpen && (
        <RealTimeData deptId={deptInfo.current.id} open={modalOpen} onCancel={handleCancel} />
      )}
    </div>
  )
}

export default Cockpit
