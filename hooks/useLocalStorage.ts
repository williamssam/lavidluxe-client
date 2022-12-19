import { SetStateAction } from 'jotai'
import { Dispatch, useEffect, useState } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const currentValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue)
      )
      return currentValue ? JSON.parse(currentValue) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      // currentValue = initialValue
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
