import { useAtom } from 'jotai'
import { CartItem } from 'models/cartModel'
import { useEffect, useMemo } from 'react'
import { userInfo } from 'store/atoms'
import { calculateVAT } from 'utils/functions/calculateVAT'

export const useCart = (cart: CartItem[]) => {
  const [info, setInfo] = useAtom(userInfo)
  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => +curr.price * curr.quantity + acc, 0),
    [cart]
  )
  const shippingCost =
    info.deliveryMethod === 'pick up' ? 0 : info.state === 'Lagos' ? 2500 : 3000

  const vat = calculateVAT(subtotal)
  const total = shippingCost + subtotal + vat

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('lavidluxeUser') as string)
    if (!user) return
    setInfo(user)
  }, [setInfo])

  return { subtotal, total, vat, shippingCost }
}
