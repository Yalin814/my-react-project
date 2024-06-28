export interface loadDepartmentChildrenResp {
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
}

export interface loadReportChartResp {
  deptId: string
  uploadRate: number
  alarmRate: number
  equipmentRate: number
  checkRate: number
  appInstallRate: number
  equipmentCompRate: number
  rateDate: string
}
