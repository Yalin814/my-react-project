import service from '@/utils/request'

export enum EvaluationApi {
  LOAD_DEPARTMENT_CHILDREN = '/loadDepartmentChildren',
  LOAD_REPORT_CHART = '/evaluate/loadReportChart'
}

export function loadDepartmentChildren(parentId: string) {
  return service.get(EvaluationApi.LOAD_DEPARTMENT_CHILDREN, {
    params: {
      parentId
    }
  })
}

export function loadReportChart(deptId: string) {
  return service.get(EvaluationApi.LOAD_REPORT_CHART, {
    params: {
      deptId
    }
  })
}
