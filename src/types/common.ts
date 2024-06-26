export interface PageInfo {
  /** 单页数据数量 */
  pageSize: number
  /** 当前页码 */
  // current: number
  pageIndex: number
  /** 全部数量 */
  total: number
}

export enum MenuType {
  MENU = '01',
  LINK = '02',
  BUTTON = '03'
}
