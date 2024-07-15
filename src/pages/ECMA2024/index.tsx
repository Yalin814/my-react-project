import { useEffect, useMemo } from 'react'

const ECMA2024 = () => {
  // 1. Group By 分组
  const test = [0, 3, -2, 5, -8, 10, -1]
  const mapGroup = useMemo(() => {
    return Map.groupBy(test, (item) => Math.sign(item))
  }, [test])
  const objectGroup = useMemo(() => {
    return Object.groupBy(test, (item) => Math.sign(item))
  }, [test])

  // 2. Promise.withResolvers
  const withResolvers = async (num: number) => {
    const { promise, resolve, reject } = Promise.withResolvers()
    setTimeout(() => {
      if (Math.sign(num) === 1) resolve(num)
      else reject(num)
    }, 2000)
    return promise
  }

  // 1. Group By 分组
  useEffect(() => {
    console.log('mapGroup', mapGroup)
    console.log('objectGroup', objectGroup)
  }, [])

  // 2. Promise.withResolvers
  useEffect(() => {
    withResolvers(10)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
    withResolvers(0)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  // 3. 正则表达式修饰符 /v
  useEffect(() => {
    // 使用 v 修饰符，不光可以继承 u 修饰符所有的功能，还支持以下功能：
    // 1.字符串集合三种集合操作，差异、相交和联合
    console.log("/^[\\w--[a-g]]$/v.test('a')", /^[\w--[a-g]]$/v.test('a'))
    console.log("/^[\\w--[a-g]]$/v.test('i')", /^[\w--[a-g]]$/v.test('i'))

    console.log("/^[[a-g]&&[g-m]]$/v.test('a')", /^[[a-g]&&[g-m]]$/v.test('a'))
    console.log("/^[[a-g]&&[g-m]]$/v.test('g')", /^[[a-g]&&[g-m]]$/v.test('g'))
    console.log("/[\\p{ASCII}&&\\p{Number}]/v.test('4')", /[\p{ASCII}&&\p{Number}]/v.test('4'))

    console.log(
      "/^\\p{L}{2}[\\p{L}\\p{N}]*[\\p{N}]$/v.test('AA5A5')",
      /^\p{L}{2}[\p{L}\p{N}]*[\p{N}]$/v.test('AA5A5')
    )
    // 2.字符串的属性，允许使用\p 转义的多节点属性

    // 3.集合中的多节点字符串，使用一个新的 \q 转义
  }, [])
  return <div>&#176;</div>
}

export default ECMA2024
