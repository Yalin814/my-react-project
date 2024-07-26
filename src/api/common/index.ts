import service from '@/utils/request'
import { type LoginForm } from './types'

export enum CommonApi {
  GET_TOKEN = '/common/getToken'
}

export function getToken(params: LoginForm) {
  return service.get(CommonApi.GET_TOKEN, {
    params
  })
}
