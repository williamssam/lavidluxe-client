import { Product } from 'models/productModel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Wishlist extends Product {
  category: string
}

type WishlistState = {
  wishlists: Wishlist[]
  addToWishlist: (product: Product, category: string) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
}

export const useWishlistsStore = create<WishlistState>()(
  immer(
    devtools(
      persist(
        set => ({
          wishlists: [],
          addToWishlist: (product, category) =>
            set(state => {
              state.wishlists.push({ ...product, category })
            }),
          removeFromWishlist: id =>
            set(state => ({
              wishlists: state.wishlists.filter(product => product._id !== id),
            })),
          clearWishlist: () => set(state => ({ wishlists: [] })),
        }),
        {
          name: 'wishlists-storage',
        }
      )
    )
  )
)
