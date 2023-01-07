import { useAtom } from 'jotai'
import { CartItem } from 'models/cartModel'
import { useMemo } from 'react'
import { userInfo } from 'store/atoms'
import { calculateVAT } from 'utils/calculateVAT'

export const useCart = (cart: CartItem[]) => {
  const [info] = useAtom(userInfo)
  const shippingCost = 1500
  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => +curr.price * curr.quantity + acc, 0),
    [cart]
  )

  const vat = calculateVAT(subtotal)
  const total = shippingCost + subtotal + vat

  return { subtotal, total, vat, shippingCost }
}
