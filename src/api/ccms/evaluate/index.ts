import { ApiResponse } from '@/api/types'
import service from '@/utils/request'
import {
  GetRateByDeptsReq,
  GetRateByDeptsResp,
  loadDepartmentChildrenResp,
  loadReportChartResp
} from './types'

export enum EvaluationApi {
  LOAD_DEPARTMENT_CHILDREN = '/loadDepartmentChildren',
  LOAD_REPORT_CHART = '/evaluate/loadReportChart',
  GET_RATE_BY_DEPTS = '/evaluate/getRateByDepts'
}

export function loadDepartmentChildren(parentId: string) {
  return service.get<ApiResponse<loadDepartmentChildrenResp[]>>(
    EvaluationApi.LOAD_DEPARTMENT_CHILDREN,
    {
      params: {
        parentId
      }
    }
  )
}

export function loadReportChart(deptId: string) {
  return service.get<ApiResponse<loadReportChartResp[]>>(EvaluationApi.LOAD_REPORT_CHART, {
    params: {
      deptId
    }
  })
}

export function getRateByDepts(params: GetRateByDeptsReq) {
  return service.get<ApiResponse<GetRateByDeptsResp[]>>(EvaluationApi.GET_RATE_BY_DEPTS, {
    params
  })
}
