import { LoadCabDeptChildResp } from '@/api/ccms/cab/types'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './index.scss'
import { loadCabDeptChild } from '@/api/ccms/cab'
import RealTimeData from './components/RealTimeData'
import blue from '@/assets/images/point.png'
import red from '@/assets/images/point10.png'
import { Button, Checkbox, Col, Form, Radio, Row, FormProps, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Cockpit = () => {
  const T = window.T
  const map = useRef<typeof T>()
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({})
  const [modalOpen, setModalOpen] = useState(false)
  const deptInfo = useRef<LoadCabDeptChildResp>({
    id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
    ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
  } as LoadCabDeptChildResp)
  const [spinning, setSpinning] = useState(true)
  const initialValues = { type: 1, currentAndBelow: true }
  const parentId = JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || ''

  const initMap = () => {
    if (mapContainerRef.current) {
      map.current = new T.Map(mapContainerRef.current)
      map.current.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      map.current.enableInertia()
      map.current.enableDrag()
      const control = new T.Control.Zoom()
      map.current.addControl(control)

      // const parentId = searchParams.get('parentId')
      fetchCabDeptChild(parentId)
    }
  }

  const handleMarkerClick = (dept: LoadCabDeptChildResp) => {
    deptInfo.current = dept
    setModalOpen(true)
  }

  const addMarker = (dept: LoadCabDeptChildResp) => {
    const latlng = new T.LngLat(dept.longitude, dept.latitude)
    const icon = new T.Icon({
      iconUrl: dept.abnormalCount == 0 ? blue : red,
      iconSize: new T.Point(19, 25),
      iconAnchor: new T.Point(10, 25)
    })
    const marker = new T.Marker(latlng, { icon: icon })
    map.current.addOverLay(marker)
    const label = new T.Label({
      text: dept.deptDesc,
      position: latlng,
      offset: new T.Point(-40, -40)
    })
    marker.addEventListener('click', () => handleMarkerClick(dept))
    marker.addEventListener('mouseover', () => {
      map.current.addOverLay(label)
    })
    marker.addEventListener('mouseout', () => {
      map.current.removeOverLay(label)
    })
  }

  const fetchCabDeptChild = (parentId: string = '', type: number = 1, currentAndBelow = true) => {
    map.current.clearOverLays()
    /**包含当前单位 */
    loadCabDeptChild(parentId)
      .then((res) => {
        if (res.result) {
          const data = res.result.filter((dept) => dept.longitude != null && dept.latitude != null)
          map.current.setViewport(data.map((item) => new T.LngLat(item.longitude, item.latitude)))
          data.map((dept) => {
            if (type == 2 && dept.abnormalCount == 0) return
            if (!currentAndBelow && dept.id != deptInfo.current.deptId) return
            addMarker(dept)
          })
        }
        setSpinning(false)
      })
      .catch(() => {
        setSpinning(false)
      })
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const handleFinish: FormProps['onFinish'] = (values) => {
    setSpinning(true)
    fetchCabDeptChild(parentId, values.type, values.currentAndBelow)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="cockpit-container">
      <Form className="search-form" onFinish={handleFinish} initialValues={initialValues}>
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item name="type" label="类型">
              <Radio.Group>
                <Radio value={1}>所有</Radio>
                <Radio value={2}>异常</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="currentAndBelow" valuePropName="checked">
              <Checkbox>本级及下级</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Spin spinning={spinning} tip="Loading...">
        <div className="map" ref={mapContainerRef}></div>
      </Spin>
      {modalOpen && (
        <RealTimeData deptId={deptInfo.current.id} open={modalOpen} onCancel={handleCancel} />
      )}
    </div>
  )
}

export default Cockpit
