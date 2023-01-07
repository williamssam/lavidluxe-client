export type Item = {
  id: string
  price: string
  name: string
  image: string
  databaseId: number
  color?: string | number
  size: number | string
}

export interface CartItem extends Item {
  quantity: number
}
