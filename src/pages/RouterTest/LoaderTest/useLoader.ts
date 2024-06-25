import { defer } from 'react-router-dom'

const useLoader = async () => {
  const user = new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: 'test',
          age: 18
        }),
      2000
    )
  )
  return defer({
    user: user
  })
}

export default useLoader
