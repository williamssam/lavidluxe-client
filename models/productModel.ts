export interface Category {
  _id: string
  products: Product[] | null
  slug: Slug
  title: string
}

export interface Product {
  _id: string
  description: string
  image: Image
  name: string
  price: number
  productColors: string[]
  slug: Slug
  tags: string[]
  promo: {
    promoOn: true
    promoPrice: number
  }
  stockStatus: 'in-stock' | 'out-of-stock'
}

export interface Slug {
  _type: 'slug'
  current: string
}

export interface Image {
  _type: string
}
