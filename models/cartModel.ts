export type Item = {
  id: string
  price: number
  name: string
  image: string
  color?: string
  size: number | string
}

export interface CartItem extends Item {
  quantity: number
}
