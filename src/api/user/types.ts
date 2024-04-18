import { PageReq } from '../types'

export interface UserInfo {
  userId: string
  userName: string
  nickName: string
  sex: string
  phoneNumber: string
  deptId: string
  deptName: string
}

export interface GetUserInfoReq {
  phone: string
  password: string
}

export interface GetUserListReq extends PageReq {
  deptId: string
}
