import { getUserInfo } from '@/api/user'
import { useEffect, useState } from 'react'

const AbortControllerTest = () => {
  const postApi = () => {
    const controller = new AbortController()
    const signal = controller.signal
    console.log(signal)
    const { promise, resolve, reject } = Promise.withResolvers()
    getUserInfo('', signal)
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
    promise.abort = () => controller.abort()
    return promise
  }

  const [api, setApi] = useState(postApi())

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      api.abort()
      setApi(postApi())
    }
  }, [])

  return <></>
}
export default AbortControllerTest
