declare global {
  interface Window {
    T: any
    _AMapSecurityConfig: any
  }
  interface ObjectConstructor {
    /**
     * Groups members of an iterable according to the return value of the passed callback.
     * @param items An iterable.
     * @param keySelector A callback which will be invoked for each item in items.
     */
    groupBy<K extends PropertyKey, T>(
      items: Iterable<T>,
      keySelector: (item: T, index: number) => K
    ): Partial<Record<K, T[]>>
  }

  interface MapConstructor {
    /**
     * Groups members of an iterable according to the return value of the passed callback.
     * @param items An iterable.
     * @param keySelector A callback which will be invoked for each item in items.
     */
    groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K): Map<K, T[]>
  }

  interface PromiseConstructor {
    withResolvers()
  }

  interface ArrayBufferConstructor {
    new (byteLength: number, options?: { maxByteLength: number }): ArrayBuffer
  }
  interface ArrayBuffer {
    resize(byteLength: number)
    transfer()
  }
}

export {}
