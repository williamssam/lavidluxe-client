// generated through json response returned by graphql by https://app.quicktype.io/

export type Products = {
  nodes: Product[]
  pageInfo: PageInfo
}

export type ProductCategories = {
  nodes: ProductCategoriesNode[]
}

export type ProductCategoriesNode = {
  id: string
  name: string
  slug: string
  products: Products
}

export type Product = {
  id: string
  databaseId: number
  name: string
  onSale: boolean
  slug: string
  date: Date
  description: null | string
  image: Image
  productTags: ProductTags
  attributes: Attributes | null
  regularPrice: string
  salePrice: string
  stockStatus: string
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type Attributes = {
  nodes: AttributesNode[]
}

export type AttributesNode = {
  id: string
  name: string
  options: string[]
}

export type Image = {
  sourceUrl: string
}

export type ProductTags = {
  nodes: ProductTagsNode[]
}

export type ProductTagsNode = {
  slug: string
  name: string
}
