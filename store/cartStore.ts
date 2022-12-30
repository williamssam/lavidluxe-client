import { CartItem } from 'models/cartModel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type CartState = {
  cart: CartItem[]
  addToCart: (product: CartItem, quantity: number) => void
  removeFromCart: (id: number) => void
}

export const useCartStore = create<CartState>()(
  immer(
    devtools(
      persist(
        set => ({
          cart: [],
          addToCart: (product, quantity) =>
            set(state => state.cart.push(product)),
          removeFromCart: id =>
            set(state => ({
              cart: state.cart.filter(product => product.id !== id),
            })),
        }),
        {
          name: 'cart-storage',
        }
      )
    )
  )
)
