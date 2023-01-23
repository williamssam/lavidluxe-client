import { XCircleIcon } from '@heroicons/react/20/solid'
import { Filter } from 'components/Filter'
import { ProductDetail } from 'components/ProductDetail'
import { Tabs } from 'components/Tabs'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Category, Product } from 'models/productModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { openCartDrawer } from 'store/atoms'
import { client } from 'utils/sanity/client'

export const getServerSideProps: GetServerSideProps<{
  categories: Category[]
}> = async () => {
  const categories = await client.fetch(
    `*[_type == "category" && !(_id in path('drafts.**'))] | order(_createdAt asc) {
      _id, title, slug,
      products[]->{name, price, image, slug, _id, stockStatus,promo}
    }`
  )

  return {
    props: {
      categories,
    },
  }
}

const Shop = ({
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { parent } = useAnimate()

  // console.log('data', categories)
  const sort = ['Default', 'Price: high to low', 'Price: low to high']
  const [selected, setSelected] = useState<string>(sort[0])
  const [currentSort, setCurrentSort] = useState(selected)

  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()
  const { slug } = router.query

  const sortObj: {
    [key: string]: (a: Product, b: Product) => any
  } = {
    Default: (a, b) => a,
    'Price: high to low': (a, b) => b.price - a.price,
    'Price: low to high': (a, b) => a.price - b.price,
  }

  useEffect(() => {
    setCurrentSort(selected)
    // console.log('current sort', currentSort)
  }, [currentSort, selected])

  return (
    <>
      <Head>
        <title>Shop - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen px-4 py-10 transition-all md:px-16 md:pt-20 md:pb-10 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Tabs categories={categories} />
        <Filter sort={sort} selected={selected} setSelected={setSelected} />

        <div
          // ref={parent}
          className='grid grid-cols-1 gap-x-6 gap-y-12 pt-5 transition-all sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
          {categories?.map(
            category =>
              category.slug.current === slug &&
              (category.products?.length ? (
                [...category.products]
                  ?.sort(sortObj[currentSort])
                  ?.map(product => (
                    <ProductDetail product={product} key={product?._id} />
                  ))
              ) : (
                <div
                  key={category._id}
                  className='col-span-full mt-10 flex w-max flex-col items-center place-self-center rounded bg-gray-100 py-6 px-3 font-vollkorn lg:px-16'>
                  <XCircleIcon className='h-12 w-12' />
                  <p className='mt-3'>
                    No product(s) available under this category
                  </p>
                  <strong className='text-sm uppercase tracking-[3px]'>
                    {router.asPath.slice(6).replace(/-/g, ' ')}
                  </strong>
                </div>
              ))
          )}
        </div>

        {/* <Pagination /> */}
      </main>
    </>
  )
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Shop
