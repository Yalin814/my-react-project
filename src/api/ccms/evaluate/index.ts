import service from '@/utils/request'

export enum EvaluationApi {
  LOAD_DEPARTMENT_CHILDREN = '/loadDepartmentChildren'
}

export function loadDepartmentChildren(parentId: string) {
  return service.get(EvaluationApi.LOAD_DEPARTMENT_CHILDREN, {
    params: {
      parentId
    }
  })
}
