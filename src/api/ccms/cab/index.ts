import { ApiResponse } from '@/api/types'
import service from '@/utils/request'
import { LoadCabDeptChildResp, LoadSensorsByDeptIdReq, LoadSensorsByDeptIdResp } from './types'

export enum CabApi {
  LOAD_CAB_DEPT_CHILD = '/cab/loadCabDeptChild',
  LOAD_SENSORS_BY_DEPT_ID = '/loadSensorsByDeptId'
}

export function loadCabDeptChild(parentId: string) {
  return service.get<ApiResponse<LoadCabDeptChildResp[]>>(CabApi.LOAD_CAB_DEPT_CHILD, {
    params: {
      parentId
    }
  })
}

export function loadSensorsByDeptId(params: LoadSensorsByDeptIdReq) {
  return service.get<ApiResponse<LoadSensorsByDeptIdResp[]>>(CabApi.LOAD_SENSORS_BY_DEPT_ID, {
    params
  })
}
