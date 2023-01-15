import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 't2mc6s36',
  dataset: 'production',
  apiVersion: '2023-01-12',
  useCdn: true,
  token: process.env.SANITY_TOKEN,
  withCredentials: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)
