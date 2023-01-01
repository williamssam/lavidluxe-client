import { CartItem } from 'models/cartModel'
import { useMemo } from 'react'

export const useCartSubtotal = (cart: CartItem[]) => {
  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => +curr.price * curr.quantity + acc, 0),
    [cart]
  )

  return { subtotal }
}
