export interface LoadCabDeptChildResp {
  abnormalCount: number
  city: string
  county: string
  deptCode: string
  deptDesc: string
  deptLevel: number
  deptType: string
  hasChild: string
  id: string
  latitude: string
  longitude: string
  parentId: string
  parentName: string
  province: string
}

export interface LoadSensorsByDeptIdReq {
  deptId: string
  _: number
}

export interface LoadSensorsByDeptIdResp {
  adjustTemp: number
  brand: string
  currentHumidity: string
  currentTemp: string
  currentTempTime: number
  hightLimitHumidity: number
  hightLimitTemp: number
  humidityRange: string
  humidityStatus: number
  id: string
  lowLimitHumidity: number
  lowLimitTemp: number
  model: string
  productionBatch: string
  range: string
  remark: string
  reportedTemperatureDept: string
  sensorDesc: string
  sensorId: string
  sensorType: string
  sn: string
  tStatus: number
  tempStatus: number
  voltage: number
  [key: string]: number | string
}
