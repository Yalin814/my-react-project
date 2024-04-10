import service from '@/config/utils/request'
import { type GetUserInfoReq, type UserInfo } from './types'

export enum UserApi {
  GET_USER_INFO = '/getUserInfo'
}

export function getUserInfo(params: GetUserInfoReq) {
  return service.get<UserInfo>(UserApi.GET_USER_INFO, { params })
}
