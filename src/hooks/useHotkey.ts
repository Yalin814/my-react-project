import hotkeys, { KeyHandler } from 'hotkeys-js'
import { useEffect } from 'react'

const useHotkey = (key: string, handler: KeyHandler) => {
  useEffect(() => {
    hotkeys(key, handler)
    return () => {
      hotkeys.unbind(key, handler)
    }
  }, [])
}

export default useHotkey
