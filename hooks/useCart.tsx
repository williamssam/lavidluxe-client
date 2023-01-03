import { useAtom } from 'jotai'
import { CartItem } from 'models/cartModel'
import { useMemo } from 'react'
import { userInfo } from 'store/gloablAtom'
import { calculateVAT } from 'utils/calculateVAT'

export const useCart = (cart: CartItem[]) => {
  const [info] = useAtom(userInfo)
  const shippingCost = info.state.toLowerCase() === 'lagos' ? 1500 : 2500
  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => +curr.price * curr.quantity + acc, 0),
    [cart]
  )

  const vat = calculateVAT(subtotal)
  const total = shippingCost + subtotal + vat

  return { subtotal, total, vat, shippingCost }
}
