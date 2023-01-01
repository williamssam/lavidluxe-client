export type Item = {
  id: string
  price: string
  name: string
  image: string
  color?: string | number
  size: number | string
}

export interface CartItem extends Item {
  quantity: number
}
