import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import './index.scss'

const OLTest = () => {
  const map = useRef<Map>()
  const mapRef = useRef<HTMLDivElement>(null)

  const initMap = () => {
    map.current = new Map({
      target: mapRef.current,
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      layers: [new TileLayer({ source: new OSM() })]
    })
  }
  useEffect(() => {
    initMap()
  }, [])

  return <div className="ol-map" ref={mapRef}></div>
}

export default OLTest
