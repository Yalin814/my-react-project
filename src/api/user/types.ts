import { PageReq } from '../types'

export interface UserInfo {
  userId: string
  userName: string
  password: string
  Sex: string
  age: number
  phone: string
  major: string
}

export interface GetUserInfoReq {
  phone: string
  password: string
}

export interface GetUserListReq extends PageReq {
  deptId: string
}
