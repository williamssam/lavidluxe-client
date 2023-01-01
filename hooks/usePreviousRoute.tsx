import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

// this would have to go in `_app.tsx` to be a true previous route tracker (across all pages)
export const usePreviousRoute = () => {
  const { asPath } = useRouter()

  const ref = useRef<string | null>(null)

  useEffect(() => {
    ref.current = asPath
  }, [asPath])

  return ref.current
}
