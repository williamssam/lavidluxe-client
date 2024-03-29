import { groq } from 'next-sanity'

export const moreData = groq`*[_type == "category" && !(_id in path('drafts.**'))] | order(_createdAt asc) {
      _id, title, slug,
      products[] && _id > $lastId | order(_id) [0...1]->{name, price, image, slug, _id, stockStatus,promo}
}`
