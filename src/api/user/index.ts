import service from '@/config/utils/request'
import { type UserInfo } from './types'

export enum UserApi {
  GET_USER_INFO = '/user/getUserInfo',
  ADD_USER = '/user/addUser'
}

export function getUserInfo(userId: string) {
  return service.get<UserInfo>(UserApi.GET_USER_INFO, {
    params: {
      userId
    }
  })
}

export function addUser(data: UserInfo) {
  return service.post(UserApi.ADD_USER, data)
}
