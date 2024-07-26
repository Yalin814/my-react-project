import coordtransform from 'coordtransform'

export const baiduToA = ([bdLng, bdLat]) => {
  const [wgsLng, wgsLat] = coordtransform.bd09togcj02(bdLng, bdLat)
  // const [wgsLngFinal, wgsLatFinal] = coordtransform.gcj02towgs84(wgsLng, wgsLat)
  // return [wgsLngFinal, wgsLatFinal]
  return [wgsLng, wgsLat]
}
