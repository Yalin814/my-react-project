import { message } from 'antd'
import axios from 'axios'

const service = axios.create({
  baseURL: '/api/ccms',
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use((reqConfig) => {
  return reqConfig
})

service.interceptors.response.use(
  (resp) => {
    return resp.data
  },
  (err) => {
    if (axios.isAxiosError(err)) {
      if (err.message === 'Network Error') {
        message.error({ content: '网络错误, 请稍后再试！' })
      } else {
        message.error({ content: '未知错误！' })
      }
    }
    return Promise.reject(err)
  }
)

export default service
