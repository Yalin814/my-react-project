import { CSSProperties, useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import './index.scss'
import { XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import Icon from 'ol/style/Icon'
import blue from '@/assets/images/point.png'
import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import { defaults } from 'ol/control'
import { baiduToA } from '@/utils/coordtransform'
import Select from 'ol/interaction/Select'
import { click } from 'ol/events/condition.js'
import { Modal } from 'antd'
import * as Extent from 'ol/extent'

const OLTest = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    display: 'none',
    top: 0,
    left: 0
  })
  const map = useRef<Map>()
  const mapRef = useRef<HTMLDivElement>(null)
  const baseSource = new XYZ({
    // url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    url: 'http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9d5c2c2c02e274b2266dc99432c12c7d',
    crossOrigin: 'anonymous'
  })

  const markupSource = new XYZ({
    // url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    url: 'http://t4.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9d5c2c2c02e274b2266dc99432c12c7d',
    crossOrigin: 'anonymous'
  })

  const hideMenu = () => {
    setMenuStyle({
      display: 'none',
      top: 0,
      left: 0
    })
  }

  const addMarker = () => {
    const icon = new Icon({
      src: blue,
      anchor: [0, 34],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels'
    })
    const style = new Style({
      image: icon,
      text: new Text({
        text: '1',
        font: '14px sans-serif', // 字体
        fill: new Fill({
          color: '#000000'
        }),
        backgroundFill: new Fill({
          color: '#ffffff'
        }),
        textAlign: 'left',
        padding: [4, 10, 4, 10],
        offsetY: -50
      })
    })
    const style1 = new Style({
      image: icon,
      text: new Text({
        text: '2',
        font: '14px sans-serif', // 字体
        fill: new Fill({
          color: '#000000'
        }),
        backgroundFill: new Fill({
          color: '#ffffff'
        }),
        textAlign: 'left',
        padding: [4, 10, 4, 10],
        offsetY: -50
      })
    })
    const feature = new Feature({
      geometry: new Point(fromLonLat(baiduToA([120.290841, 30.402791]))),
      properties: {
        id: '1'
      }
    })

    const feature1 = new Feature({
      geometry: new Point(fromLonLat(baiduToA([120.390841, 30.402791]))),
      properties: {
        id: '2'
      }
    })
    feature.setStyle(style)
    feature1.setStyle(style1)
    const vectorSource = (map.current.getLayers().item(2) as VectorLayer<Feature>).getSource()
    vectorSource.addFeature(feature)
    vectorSource.addFeature(feature1)
  }

  const initMap = () => {
    map.current = new Map({
      controls: defaults(),
      target: mapRef.current,
      view: new View({
        center: fromLonLat([120.173018, 30.191416]),
        zoom: 9,
        minZoom: 4,
        maxZoom: 18
      }),
      layers: [
        new TileLayer({ source: baseSource }),
        new TileLayer({ source: markupSource }),
        new VectorLayer({
          source: new VectorSource()
        })
      ]
    })

    const select = new Select({
      toggleCondition: click,
      multi: false,
      condition: click,
      style: function (feature) {
        const id = feature.get('properties').id
        const icon = new Icon({
          src: blue,
          anchor: [0, 34],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels'
        })
        const style = new Style({
          image: icon,
          text: new Text({
            text: id,
            font: '14px sans-serif', // 字体
            fill: new Fill({
              color: '#000000'
            }),
            backgroundFill: new Fill({
              color: '#ffffff'
            }),
            textAlign: 'left',
            padding: [4, 10, 4, 10],
            offsetY: -50
          })
        })
        return [style]
      }
    })

    const select1 = new Select({
      toggleCondition: (e) => {
        return e.type === 'contextmenu'
      },
      multi: false,
      condition: (e) => {
        return e.type === 'contextmenu'
      },
      style: function (feature) {
        const id = feature.get('properties').id
        const icon = new Icon({
          src: blue,
          anchor: [0, 34],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels'
        })
        const style = new Style({
          image: icon,
          text: new Text({
            text: id,
            font: '14px sans-serif', // 字体
            fill: new Fill({
              color: '#000000'
            }),
            backgroundFill: new Fill({
              color: '#ffffff'
            }),
            textAlign: 'left',
            padding: [4, 10, 4, 10],
            offsetY: -50
          })
        })
        return [style]
      }
    })

    select.on('select', (e) => {
      console.log(e)
      const view = map.current.getView()
      // view.setCenter(e.mapBrowserEvent.coordinate)
      const feature = e.selected.concat(e.deselected)[0]
      console.log(feature.get('properties'))
      setModalOpen(true)
    })

    select1.on('select', (e) => {
      const view = map.current.getView()
      // view.setCenter(e.mapBrowserEvent.coordinate)
      console.log(e)
      const feature = e.selected.concat(e.deselected)[0]

      const pixel = map.current.getPixelFromCoordinate(e.mapBrowserEvent.coordinate)
      setMenuStyle({
        display: 'block',
        left: pixel[0] + 'px',
        top: pixel[1] + 'px'
      })
    })

    // map.current.addInteraction(select)
    map.current.addInteraction(select1)
    addMarker()
    const extent = Extent.boundingExtent([
      fromLonLat(baiduToA([120.290841, 30.402791])),
      fromLonLat(baiduToA([120.390841, 30.402791]))
    ])

    map.current.getView().fit(extent, {
      size: map.current.getSize(),
      padding: [280, 280, 280, 280]
    })
    map.current.on('pointermove', function (e) {
      map.current.getTargetElement().style.cursor = map.current.hasFeatureAtPixel(e.pixel)
        ? 'pointer'
        : ''
    })
    map.current.on('click', () => {
      hideMenu()
    })
    map.current.on('movestart', () => {
      hideMenu()
    })
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    initMap()
    addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    return () => {
      removeEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
    }
  }, [])

  return (
    <div className="ol-map">
      <div className="map-container" ref={mapRef}></div>
      {modalOpen && <Modal open={modalOpen} onCancel={handleCancel} />}
      <div className="custom-menu" style={menuStyle}>
        <div onClick={hideMenu}>
          上传及时率：
          {0.0}%
        </div>
        <div onClick={hideMenu}>
          审核及时率：
          {0.0}%
        </div>
        <div onClick={hideMenu}>
          APP安装率：
          {0.0}%
        </div>
        <div onClick={hideMenu}>
          冷链设备档案表完成率：
          {0.0}%
        </div>
        <div onClick={hideMenu}>趋势</div>
      </div>
    </div>
  )
}

export default OLTest
