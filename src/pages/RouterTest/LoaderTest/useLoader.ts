const useLoader = async () => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: 'test',
          age: 18
        }),
      5000
    )
  )
}

export default useLoader
