import { XCircleIcon } from '@heroicons/react/20/solid'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Filter } from 'components/Filter'
import { ProductDetail } from 'components/ProductDetail'
import { Spinner } from 'components/Spinner'
import { Tabs } from 'components/Tabs'
import { useAnimate } from 'hooks/useAnimate'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Category, Product } from 'models/productModel'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { openCartDrawer } from 'store/atoms'
import { client } from 'utils/sanity/client'

const getProducts = async () => {
  const products = await client.fetch(
    `*[_type == "category" && !(_id in path('drafts.**'))] | order(_createdAt asc) {
      _id, title, slug,
      products[]->{name, price, image, slug, _id, stockStatus, promo, _createdAt}
    }`
  )

  return products as Category[]
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['products'], getProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

type SortObj = {
  [key: string]: (a: Product, b: Product) => any
}

const sort = [
  'Latest',
  'Oldest',
  'Price, high to low',
  'Price, low to high',
  'Alphabetically, A-Z',
  'Alphabetically, Z-A',
]

const sortObj: SortObj = {
  Latest: (a, b) => Date.parse(a._createdAt) - Date.parse(b._createdAt),
  Oldest: (a, b) => Date.parse(b._createdAt) - Date.parse(a._createdAt),
  'Price, high to low': (a, b) => a.price - b.price,
  'Price, low to high': (a, b) => b.price - a.price,
  'Alphabetically, A-Z': (a, b) => a.name.localeCompare(b.name),
  'Alphabetically, Z-A': (a, b) => b.name.localeCompare(a.name),
}

const Shop = () => {
  const { parent } = useAnimate()
  const { data: categories, isLoading } = useQuery(['products'], getProducts)

  const [selected, setSelected] = useState<string>(sort[0])
  const [currentSort, setCurrentSort] = useState(selected)
  const [grid, setGrid] = useState<number | null>(null)

  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('lavidluxeGrid') as string)
    if (value) {
      setGrid(value)
      return
    }
    setGrid(3)
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <NextSeo
        title={
          categories
            ? categories?.find(category => category.slug.current === slug)
                ?.title
            : 'Shop'
        }
      />

      <main
        className={`min-h-screen px-4 py-10 transition-all md:px-16 md:pt-20 md:pb-10 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        {categories ? <Tabs categories={categories} /> : null}
        <Filter
          sort={sort}
          selected={selected}
          setSelected={setSelected}
          products={categories}
          grid={grid}
          setGrid={setGrid}
          setCurrentSort={setCurrentSort}
        />

        <section
          ref={parent}
          className={`grid grid-cols-1 gap-x-6 gap-y-12 pt-5 transition-all sm:grid-cols-2 md:grid-cols-2 ${
            grid === 4
              ? 'lg:grid-cols-4'
              : grid === 3
              ? 'lg:grid-cols-3'
              : 'lg:grid-cols-2'
          }`}>
          {categories?.map(
            category =>
              category.slug.current === slug &&
              (category.products?.length ? (
                [...category.products]
                  ?.sort(sortObj[currentSort])
                  ?.map(product => (
                    <ProductDetail
                      product={product}
                      key={product?._id}
                      category={category.slug.current}
                    />
                  ))
              ) : (
                <div
                  key={category._id}
                  className='col-span-full mt-10 flex w-max flex-col items-center place-self-center rounded bg-gray-100 py-6 px-3 font-vollkorn lg:px-16'>
                  <XCircleIcon className='h-12 w-12' />
                  <p className='mt-3'>
                    No product(s) available under this category
                  </p>
                  <strong className='text-sm uppercase'>
                    {router.asPath.slice(6).replace(/-/g, ' ')}
                  </strong>
                </div>
              ))
          )}
        </section>
      </main>
    </>
  )
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Shop
