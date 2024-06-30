export interface PageReq {
  pageIndex?: number
  pageSize?: number
}

/**
 * 接口响应类型
 *
 * T 为data具体类型,默认为null
 */
export interface ApiResponse<T = null> {
  result: T
  message?: string
  type: string
  total: number
  status: number
}