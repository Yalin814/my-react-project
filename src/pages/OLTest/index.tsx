import { useEffect, useRef } from 'react'
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

const OLTest = () => {
  const map = useRef<Map>()
  const mapRef = useRef<HTMLDivElement>(null)
  const amapSource = new XYZ({
    url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    crossOrigin: 'anonymous'
  })

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
        text: '杭州市疾病预防控制中心',
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
      geometry: new Point(fromLonLat(baiduToA([120.290841, 30.402791])))
    })
    feature.setStyle(style)
    const vectorSource = (map.current.getLayers().item(1) as VectorLayer<Feature>).getSource()
    vectorSource.addFeature(feature)
  }

  const initMap = () => {
    map.current = new Map({
      controls: defaults(),
      target: mapRef.current,
      view: new View({
        center: fromLonLat([120.173018, 30.191416]),
        zoom: 9,
        minZoom: 4,
        maxZoom: 19
      }),
      layers: [
        new TileLayer({ source: amapSource }),
        new VectorLayer({
          source: new VectorSource()
        })
      ]
    })

    const select = new Select({
      condition: click
    })
    select.on('select', (e) => {
      console.log(e)
      const view = map.current.getView()
      view.setCenter(e.mapBrowserEvent.coordinate)
    })
    map.current.addInteraction(select)
    addMarker()
  }
  useEffect(() => {
    initMap()
  }, [])

  return <div className="ol-map" ref={mapRef}></div>
}

export default OLTest
