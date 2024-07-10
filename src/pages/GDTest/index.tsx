import { useEffect } from 'react'
import './index.scss'
import AMapLoader from '@amap/amap-jsapi-loader'

const GDTest = () => {
  let map = null

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: '09115e0a4887676170912da1d6067dac'
    }
    AMapLoader.load({
      key: '3e84579d6a3e0c7dd3fcab457777111b', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        map = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [116.397428, 39.90923] // 初始化地图中心点位置
        })
        const marker = new AMap.Marker({
          position: new AMap.LngLat(116.39, 39.9), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: '北京'
        })
        //将创建的点标记添加到已有的地图实例：
        map.add(marker)
      })
      .catch((e) => {
        console.log(e)
      })

    return () => {
      map?.destroy()
    }
  }, [])
  return <div id="container" className="gd-map"></div>
}

export default GDTest
