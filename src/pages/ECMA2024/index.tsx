import { use } from 'echarts'
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
    console.log(
      "'Did you see 👍'.match(/\\p{RGI_Emoji}/v)",
      'Did you see 👍'.match(/\p{RGI_Emoji}/v)
    )
    // 3.集合中的多节点字符串，使用一个新的 \q 转义
    console.log(
      "/[\\r\\n\\q{\\r\\n|NEWLINE}]/v.test('\\rNEWLINE')",
      /[\r\n\q{\r\n|NEWLINE}]/v.test('\rNEWLINE')
    )
  }, [])

  // 4. ArrayBuffers 和 SharedArrayBuffers 的新功能
  useEffect(() => {
    // 4.1 ArrayBuffer 就地调整大小
    // 不允许超过预先定义的 maxByteLength , resize 可增大也可以减小
    const arrayBuffer = new ArrayBuffer(2, { maxByteLength: 10 })
    console.log(arrayBuffer.byteLength)
    arrayBuffer.resize(8)
    console.log(arrayBuffer.byteLength)
    // 4.2  ArrayBuffer  .transfer() 可转移
    const original = new ArrayBuffer(8)
    const transferred = original.transfer()
    console.log(original)
    console.log(transferred)
    // 4.3 SharedArrayBuffer
    // SharedArrayBuffer可以调整大小，但它们只能增长而不能缩小。
    // 它们不可转移，因此无法获取 ArrayBuffer所获取的方法 .transfer()。
  }, [])

  // 5 新增了两个确保字符串格式正确的函数
  useEffect(() => {
    // 5.1 String.prototype.isWellFormed
    // 5.2 String.prototype.toWellFormed
  }, [])

  // 6. Atomics.waitAsync()
  useEffect(() => {}, [])
  return <div>&#176;</div>
}

export default ECMA2024
