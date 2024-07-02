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
  deptId?: string
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
  sensorType: SensorType
  sn: string
  tStatus: number
  tempStatus: number
  voltage: number
  [key: string]: number | string
}

export enum SensorType {
  SINGLE_TEMP = '01',
  SINGLE_LABEL = '02',
  SENSOR = '03',
  LABEL = '04'
}

export const sensorTypeKV: Record<SensorType, string> = {
  [SensorType.SINGLE_TEMP]: '单温探头',
  [SensorType.SINGLE_LABEL]: '单温标签',
  [SensorType.SENSOR]: '温湿度探头',
  [SensorType.LABEL]: '温湿度标签'
}
