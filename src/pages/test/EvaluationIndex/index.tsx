import { CSSProperties, useEffect, useRef, useState } from 'react'
import './index.scss'
import { getRateByDepts, loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'
import { GetRateByDeptsReq, LoadDepartmentChildrenResp } from '@/api/ccms/evaluate/types'
import { Button, Form, Row, Col, DatePicker, FormProps, Spin } from 'antd'
import TrendChart from './components/TrendChart'
import { FileSearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const MapTest = () => {
  const T = window.T
  let map: typeof T
  const [spinning, setSpinning] = useState(true)
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({})
  const [trendOpen, setTrendOpen] = useState(false)
  const deptInfo = useRef<LoadDepartmentChildrenResp>({} as LoadDepartmentChildrenResp)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    display: 'none',
    top: 0,
    left: 0
  })
  const initialValues = { year: dayjs().valueOf(), month: dayjs().valueOf() }

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
      map.enableInertia()
      map.enableDrag()
      const control = new T.Control.Zoom()
      map.addControl(control)
      map.addEventListener('click', hideMenu)
      map.addEventListener('zoomstart', hideMenu)
      map.addEventListener('dragStart', hideMenu)
      map.addEventListener('contextmenu', hideMenu)

      const parentId = searchParams.get('parentId')
      Promise.all([
        fetchDepartmentChildren(parentId || ''),
        fetchRateByDepts(dayjs().format('YYYY-MM'))
      ]).finally(() => {
        setSpinning(false)
      })
    }
  }

  const addMarker = (dept: LoadDepartmentChildrenResp) => {
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
    marker.addEventListener('contextmenu', (e: { containerPoint: { x: number; y: number } }) => {
      setMenuStyle({
        display: 'block',
        left: e.containerPoint.x + 'px',
        top: e.containerPoint.y - 10 + 'px'
      })
      handleMarkerRightClick(dept)
    })
  }

  const goBack = () => {
    console.log(map)
    fetchDepartmentChildren(deptInfo.current.parentId || '')
  }

  const handleMarkerClick = (dept: LoadDepartmentChildrenResp) => {
    deptInfo.current = dept
    if (dept.deptLevel == 4) {
      map.clearOverLays()
      addMarker(dept)
      map.panTo(new T.LngLat(dept.longitude, dept.latitude), 6)
    } else fetchDepartmentChildren(dept.id)
  }

  const handleMarkerRightClick = (dept: LoadDepartmentChildrenResp) => {
    deptInfo.current = dept
  }

  const fetchRateByDepts = async (date: string) => {
    const reqData: GetRateByDeptsReq = {
      deptId: deptInfo.current.parentId || '',
      date
    }
    await getRateByDepts(reqData).then((res) => {})
  }

  const fetchDepartmentChildren = async (parentId: string = '') => {
    map.clearOverLays()
    await loadDepartmentChildren(parentId)
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
              // const marker = new T.Marker(latlng)
              const marker = new T.Marker(latlng, { icon: icon })
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

  const handleFinish: FormProps['onFinish'] = async (values) => {
    setSpinning(true)
    await fetchRateByDepts(dayjs(values.year).format('YYYY-MM'))
    setSpinning(false)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="map-container">
      <Form className="search-form" onFinish={handleFinish} initialValues={initialValues}>
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              name="year"
              label="年"
              getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
              normalize={(value) => value && `${dayjs(value).valueOf()}`}
            >
              <DatePicker placeholder="请选择年份" format="YYYY" picker="year" allowClear={false} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="month"
              label="月"
              getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
              normalize={(value) => value && `${dayjs(value).valueOf()}`}
            >
              <DatePicker placeholder="请选择月份" format="MM" picker="month" allowClear={false} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <FileSearchOutlined />
                查询记录
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Spin spinning={spinning} tip="Loading...">
        <div className="map" ref={mapContainerRef}>
          <Button onClick={goBack} className="go-back">
            <img
              style={{ width: 14 }}
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M448 440a16 16 0 01-12.61-6.15c-22.86-29.27-44.07-51.86-73.32-67C335 352.88 301 345.59 256 344.23V424a16 16 0 01-27 11.57l-176-168a16 16 0 010-23.14l176-168A16 16 0 01256 88v80.36c74.14 3.41 129.38 30.91 164.35 81.87C449.32 292.44 464 350.9 464 424a16 16 0 01-16 16z'/></svg>"
            />
            上级部门
          </Button>
        </div>
      </Spin>

      <div className="custom-menu" style={menuStyle}>
        <div onClick={hideMenu}>
          上传及时率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          审核及时率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          APP安装率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          冷链设备档案表完成率：
          {(deptInfo.current.deptLevel != null && (deptInfo.current.deptLevel * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={openTrendModal}>趋势</div>
      </div>
      {trendOpen && (
        <TrendChart
          deptId={deptInfo.current.id}
          title={deptInfo.current.deptDesc}
          open={trendOpen}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default MapTest
