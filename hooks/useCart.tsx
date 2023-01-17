import { CartItem } from 'models/cartModel'
import { useMemo } from 'react'
import { calculateVAT } from 'utils/functions/calculateVAT'

export const useCart = (cart: CartItem[]) => {
  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => +curr.price * curr.quantity + acc, 0),
    [cart]
  )
  const shippingCost = subtotal >= 100000 ? 0 : 1500

  const vat = calculateVAT(subtotal)
  const total = shippingCost + subtotal + vat

  return { subtotal, total, vat, shippingCost }
}
