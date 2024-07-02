import { CSSProperties, useEffect, useRef, useState } from 'react'
import './index.scss'
import { getRateByDepts, loadDepartmentChildren } from '@/api/ccms/evaluate'
import { useSearchParams } from 'react-router-dom'
import { GetRateByDeptsReq, LoadDepartmentChildrenResp } from '@/api/ccms/evaluate/types'
import { Button, Form, Row, Col, DatePicker, FormProps, Spin, message } from 'antd'
import TrendChart from './components/TrendChart'
import { FileSearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import red from '@/assets/images/point10.png'
import green from '@/assets/images/point100.png'
import blue from '@/assets/images/point99.png'
import yellow from '@/assets/images/point80.png'
import orange from '@/assets/images/point50.png'

const MapTest = () => {
  const T = window.T
  const map = useRef<typeof T>()
  const [messageApi, contextHolder] = message.useMessage()
  const [spinning, setSpinning] = useState(true)
  const mapContainerRef = useRef(null)
  const [searchParams] = useSearchParams({})
  const [trendOpen, setTrendOpen] = useState(false)
  const deptInfo = useRef<LoadDepartmentChildrenResp>({
    id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
    ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
  } as LoadDepartmentChildrenResp)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    display: 'none',
    top: 0,
    left: 0
  })
  const initialValues = { year: dayjs().valueOf(), month: dayjs().valueOf() }
  const deptStack = useRef<LoadDepartmentChildrenResp[]>([
    {
      id: JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}').deptId || '',
      ...JSON.parse(localStorage.getItem('ccmsCurrentDept') || '{}')
    } as LoadDepartmentChildrenResp
  ])
  const [searchForm] = Form.useForm<GetRateByDeptsReq>()

  const hideMenu = () => {
    setMenuStyle({
      display: 'none',
      top: 0,
      left: 0
    })
  }

  const initMap = () => {
    if (mapContainerRef.current) {
      map.current = new T.Map(mapContainerRef.current)
      map.current.centerAndZoom(new T.LngLat(120.234488, 30.313231), 6)
      map.current.enableInertia()
      map.current.enableDrag()
      const control = new T.Control.Zoom()
      map.current.addControl(control)
      map.current.addEventListener('click', hideMenu)
      map.current.addEventListener('zoomstart', hideMenu)
      map.current.addEventListener('dragstart', hideMenu)
      map.current.addEventListener('contextmenu', hideMenu)

      // const parentId = searchParams.get('parentId')
      // if (!parentId) {
      //   messageApi.warning('请选择部门！')
      //   return
      // }
      // fetchDepartmentChildren(parentId || '')
      if (!deptInfo.current.id) {
        messageApi.warning('请选择部门！')
        setSpinning(false)
        return
      }
      if (deptStack.current && deptStack.current.length > 0)
        fetchDepartmentChildren(deptStack.current[deptStack.current.length - 1].id)
    }
  }

  const addMarker = (dept: LoadDepartmentChildrenResp) => {
    const uploadRate = dept.rateData?.uploadRate == null ? null : dept.rateData.uploadRate * 100
    const icon = new T.Icon({
      iconUrl:
        uploadRate == null || uploadRate <= 10
          ? red
          : uploadRate == 100
          ? green
          : uploadRate > 80 && uploadRate <= 99
          ? blue
          : uploadRate > 50 && uploadRate <= 80
          ? yellow
          : orange,
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
    marker.addEventListener('contextmenu', (e: { containerPoint: { x: number; y: number } }) => {
      setMenuStyle({
        display: 'block',
        left: e.containerPoint.x + 216 + 'px',
        top: e.containerPoint.y + 179 + 'px'
      })
      handleMarkerRightClick(dept)
    })
  }

  const goBack = () => {
    if (deptStack.current && deptStack.current.length > 1) {
      deptStack.current.pop()
      fetchDepartmentChildren(deptStack.current[deptStack.current.length - 1].id)
    }
  }

  const handleMarkerClick = (dept: LoadDepartmentChildrenResp) => {
    hideMenu()
    const i = deptStack.current.findIndex((item) => item.id == dept.id)
    if (i == -1) deptStack.current.push(dept)
    else return
    if (dept.deptLevel == 4) {
      map.current.clearOverLays()
      addMarker(dept)
      map.current.panTo(new T.LngLat(dept.longitude, dept.latitude), 6)
    } else fetchDepartmentChildren(dept.id)
  }

  const handleMarkerRightClick = (dept: LoadDepartmentChildrenResp) => {
    deptInfo.current = dept
  }

  const fetchDepartmentChildren = (parentId: string = '') => {
    map.current.clearOverLays()
    loadDepartmentChildren(parentId)
      .then((res) => {
        if (res.result) {
          const deptList = res.result
            .concat([deptStack.current[deptStack.current.length - 1]])
            .filter((dept) => dept.longitude != null && dept.latitude != null)
          const reqData: GetRateByDeptsReq = {
            deptId: parentId,
            date: dayjs(searchForm.getFieldsValue().year).format('YYYY-MM')
          }
          map.current.setViewport(
            deptList.map((item) => new T.LngLat(item.longitude, item.latitude))
          )
          getRateByDepts(reqData)
            .then((res) => {
              if (res.result) {
                deptList.forEach((dept) => {
                  const rateData = res.result.find((item) => item.deptId == dept.id)
                  dept.rateData = rateData
                  addMarker(dept)
                })
              }
            })
            .finally(() => {
              setSpinning(false)
            })
        } else {
          setSpinning(false)
        }
      })
      .catch(() => {
        setSpinning(false)
      })
  }

  const openTrendModal = () => {
    hideMenu()
    setTrendOpen(true)
  }

  const handleCancel = () => {
    setTrendOpen(false)
  }

  const handleFinish: FormProps['onFinish'] = () => {
    setSpinning(true)
    if (deptStack.current && deptStack.current.length > 0)
      fetchDepartmentChildren(deptStack.current[deptStack.current.length - 1].id)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="map-container">
      {contextHolder}
      <Form
        form={searchForm}
        className="search-form"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
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
          {(deptInfo.current.rateData &&
            deptInfo.current.rateData.uploadRate != null &&
            (deptInfo.current.rateData.uploadRate * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          审核及时率：
          {(deptInfo.current.rateData &&
            deptInfo.current.rateData.checkRate != null &&
            (deptInfo.current.rateData.checkRate * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          APP安装率：
          {(deptInfo.current.rateData &&
            deptInfo.current.rateData.appInstallRate != null &&
            (deptInfo.current.rateData.appInstallRate * 100).toFixed(1)) ||
            0.0}
          %
        </div>
        <div onClick={hideMenu}>
          冷链设备档案表完成率：
          {(deptInfo.current.rateData &&
            deptInfo.current.rateData.equipmentCompRate != null &&
            (deptInfo.current.rateData.equipmentCompRate * 100).toFixed(1)) ||
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
