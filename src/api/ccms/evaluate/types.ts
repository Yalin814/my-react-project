export interface LoadDepartmentChildrenResp {
  abnormalCount: number
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
  rateData?: GetRateByDeptsResp
  deptId?: string
}

export interface CurrentDept {
  deptCode: string
  deptDesc: string
  deptId: string
  deptLevel: string
  deptType: string
  hasChild: string
  latitude: string
  longitude: string
  parentName: string
  tId: string
}

export interface LoadReportChartResp {
  deptId: string
  uploadRate: number
  alarmRate: number
  equipmentRate: number
  checkRate: number
  appInstallRate: number
  equipmentCompRate: number
  rateDate: string
}

export interface GetRateByDeptsReq {
  deptId: string
  date: string
}

export interface GetRateByDeptsResp {
  alarmRate: number
  appInstallRate: number
  checkRate: number
  deptId: string
  equipmentCompRate: number
  equipmentRate: number
  rateDate: string
  uploadRate: number
}
