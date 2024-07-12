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

export const menuTypeKV: Record<MenuType, string> = {
  [MenuType.MENU]: '菜单',
  [MenuType.LINK]: '外链',
  [MenuType.BUTTON]: '按钮'
}

export enum DisplayType {
  SHOW = '01',
  HIDE = '02'
}

export const displayTypeKV: Record<DisplayType, string> = {
  [DisplayType.SHOW]: '显示',
  [DisplayType.HIDE]: '隐藏'
}

export enum MenuStatus {
  NORMAL = '01',
  BLOCK = '02'
}

export const menuStatusKV: Record<MenuStatus, string> = {
  [MenuStatus.NORMAL]: '正常',
  [MenuStatus.BLOCK]: '停用'
}
