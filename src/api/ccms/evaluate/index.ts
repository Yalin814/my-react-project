import { ApiResponse } from '@/api/types'
import service from '@/utils/request'
import { loadDepartmentChildrenResp, loadReportChartResp } from './types'

export enum EvaluationApi {
  LOAD_DEPARTMENT_CHILDREN = '/loadDepartmentChildren',
  LOAD_REPORT_CHART = '/evaluate/loadReportChart'
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
