import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef } from 'react'

export const useAnimate = () => {
  const parent = useRef(null)

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 500,
      })
  }, [parent])

  return { parent }
}
