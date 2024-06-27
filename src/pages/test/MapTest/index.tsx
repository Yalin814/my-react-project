import { useEffect, useRef } from 'react'
import './index.scss'
import { loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'

const MapTest = () => {
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams()

  const initMap = () => {
    if (mapContainerRef.current) {
      const map = new T.Map(mapContainerRef.current)
      map.centerAndZoom(new T.LngLat(116.39, 39.9), 10)
      const control = new T.Control.Zoom()
      //添加缩放平移控件
      map.addControl(control)
    }
  }

  const fetchDepartmentChildren = () => {
    const parentId = searchParams.get('parentId')
    if (parentId)
      loadDepartmentChildren(parentId).then((res) => {
        console.log(res)
      })
  }

  useEffect(() => {
    fetchDepartmentChildren()
    initMap()
  }, [])

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef}></div>
    </div>
  )
}

export default MapTest
