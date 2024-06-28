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
    return Promise.reject(err)
  }
)

export default service
