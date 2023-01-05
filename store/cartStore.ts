import { CartItem, Item } from 'models/cartModel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type CartState = {
  cart: CartItem[]
  addToCart: (product: Item, quantity: number) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  immer(
    devtools(
      persist(
        set => ({
          cart: [],
          addToCart: (product, quantity) =>
            set(state => {
              // if state contains the product, do not add the product again instead increase the quantity by 1 or by quantity passed as function parameter
              state.cart.some(prod => prod.id === product.id)
                ? state.cart.find(prod => {
                    if (prod.id === product.id) {
                      prod.quantity += quantity ?? 1
                    }
                  })
                : state.cart.push({ ...product, quantity })
            }),
          removeFromCart: id =>
            set(state => ({
              cart: state.cart.filter(product => product.id !== id),
            })),
          increaseQuantity: id =>
            set(state =>
              state.cart.find(prod => {
                if (prod.id === id) {
                  prod.quantity += 1
                }
              })
            ),
          decreaseQuantity: id =>
            set(state =>
              state.cart.find(prod => {
                if (prod.id === id) {
                  if (prod.quantity <= 1) return
                  prod.quantity -= 1
                }
              })
            ),
          clearCart: () => set(state => ({ cart: [] })),
        }),
        {
          name: 'cart-storage',
        }
      )
    )
  )
)
