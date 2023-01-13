import { useCallback, useRef } from 'react'
import { type IProps } from 'react-canvas-confetti'

type CreateConfetti = NonNullable<
  Parameters<NonNullable<IProps['refConfetti']>>[0]
>

export const useConfetti = () => {
  const refAnimationInstance = useRef<CreateConfetti | null>(null)

  const getInstance = useCallback((instance: CreateConfetti | null) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current?.({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  return { fire, getInstance }
}
