export interface Categories {
  categories: Category[]
}

export interface Category {
  __typename: string
  id: string
  slug: string
  name: string
  products: Product[]
}

export interface Product {
  __typename: ProductTypename
  description: string
  createdAt: Date
  id: string
  name: string
  price: number
  images: Image[]
  stockStatus: StockStatus
  slug: string
  variants: Variant[]
}

export type ProductTypename = 'Product'

export interface Image {
  __typename: ImageTypename
  url: string
}

export type ImageTypename = 'Asset'

export interface StockStatus {
  name: string
}

export interface Variant {
  id: string
  name: string
}
