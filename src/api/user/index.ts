import service from '@/config/utils/request'
import { GetUserListReq, type UserInfo } from './types'

export enum UserApi {
  GET_USER_INFO = '/user/getUserInfo',
  GET_USER_LIST = '/user/getUserList',
  ADD_USER = '/user/addUser'
}

export function getUserInfo(userId: string) {
  return service.get<UserInfo>(UserApi.GET_USER_INFO, {
    params: {
      userId
    }
  })
}

export function getUserList(data: GetUserListReq) {
  return service.post(UserApi.GET_USER_LIST, data)
}

export function addUser(data: UserInfo) {
  return service.post(UserApi.ADD_USER, data)
}
