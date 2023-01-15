import Head from 'next/head'

import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { ProductFooter } from 'components/ProductFooter'
import { QuantityPicker } from 'components/QuantityPicker'
import { Select } from 'components/Select'
import { Timer } from 'components/Timer'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Product } from 'models/productModel'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { checkDate } from 'utils/functions/checkDate'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { client, urlFor } from 'utils/sanity/client'

// ;`*[_type == "category" && !(_id in path('drafts.**'))] | order(_createdAt asc) {
//       _id, title, slug,
//       products[]->{name, price, image, slug, _id, stockStatus}
//     }`

const size = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const paths = await client.fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((id: string) => ({ params: { id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  // const {id = ""} = context.params
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug && !(_id in path('drafts.**'))] {
      name, price, image, slug, _id, stockStatus, description, tags, productColors, promo
    }`,
    { slug: context.params?.id }
  )

  return {
    props: {
      product: product[0],
    },
  }
}

type ProductDetailsProps = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const addToCart = useCartStore(state => state.addToCart)
  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()

  console.log('product', product.promo)

  // Convert this to usereducer
  const [productQuantity, setProductQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | number>(size[0])
  const [selectedColor, setSelectedColor] = useState<string | number>('Select')
  const [selectError, setSelectError] = useState('')

  const increaseProductQuantity = () => setProductQuantity(productQuantity + 1)
  const decreaseProductQuantity = () => {
    if (productQuantity === 1) return
    setProductQuantity(productQuantity - 1)
  }

  const cartProduct = {
    id: product._id,
    image: urlFor(product.image).auto('format').url(),
    name: product.name,
    price: product.promo?.promoOn ? product.promo.promoPrice : product.price,
    size: selectedSize,
    color: selectedColor,
  }

  // let pageUrl = typeof window !== undefined ? window.location.href : null

  return (
    <>
      <Head>
        <title>{product?.name} - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen items-center transition-all grid grid-cols-1 lg:grid-cols-5 overflow-hidden ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <InnerImageZoom
          src={urlFor(product.image).auto('format').url()}
          zoomSrc={urlFor(product.image).auto('format').url()}
          className='mt-16 h-[28rem] bg-main/10 object-cover object-top md:col-span-3 md:mt-0 md:h-[35rem] lg:h-screen'
          zoomType='hover'
          zoomPreload={true}
          fullscreenOnMobile={true}
          imgAttributes={{ alt: product.name }}
        />

        <section className='justify-end self-center px-3 py-5 md:col-span-2 md:px-16 lg:px-10 xl:px-16 md:pb-0'>
          <button
            className='text-xs mb-5 flex items-center gap-2'
            onClick={() => router.push('/shop/all')}>
            <ArrowLeftIcon className='w-4 h-4' />
            Back to shop
          </button>
          <header className='text-center md:text-left flex items-center justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center'>
            <div>
              <div>
                {product.tags?.map(tag => (
                  <p
                    className='text-[0.65rem] text-left text-main font-bold'
                    key={tag}>
                    #{tag}
                  </p>
                ))}
                <h2 className='text-xl font-black uppercase tracking-[3px] text-gray-700 md:text-2xl md:tracking-[5px]'>
                  {product.name}
                </h2>
              </div>

              <div className='flex items-center gap-2 pt-1'>
                {/* <p className='text-sm text-[#8c8c8c] font-bold'>
                  {formatCurrency(product.price)}
                </p> */}
                <p
                  className={`text-[#8c8c8c] ${
                    product.promo?.promoOn
                      ? 'line-through text-xs font-normal'
                      : 'no-underline text-sm font-bold'
                  }`}>
                  {formatCurrency(product.price)}
                </p>
                {product.promo?.promoOn ? (
                  <p className='text-sm text-[#8c8c8c] font-bold'>
                    {formatCurrency(product.promo.promoPrice)}
                  </p>
                ) : null}
              </div>
            </div>

            {product.stockStatus === 'in-stock' ? (
              <p className='uppercase tracking-[3px] text-[0.6rem] py-1 px-2 bg-emerald-100 text-emerald-500 rounded font-black'>
                In stock
              </p>
            ) : (
              <p className='uppercase tracking-[3px] text-[0.6rem] py-1 px-2 bg-gray-200 text-gray-500 rounded font-black'>
                Out of stock
              </p>
            )}
          </header>

          {product.promo?.promoOn && checkDate(product.promo.promoStart) ? (
            <Timer deadline={product.promo.promoEnd} />
          ) : null}

          {product.description ? (
            <div className='max-w-[55ch] pt-10 lg:pt-5 xl:pt-10 font-vollkorn text-base leading-7 md:text-left '>
              <p>{product.description}</p>
            </div>
          ) : null}

          <div className='flex items-center justify-between border-y border-y-[#dddddd] py-1 text-xs mt-10'>
            <div className='flex items-center gap-3'>
              <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                Size
              </h3>
              <Select
                data={size}
                selected={selectedSize}
                setSelected={setSelectedSize}
                className='w-[5.1rem]'
              />
            </div>
            {product.productColors.length ? (
              <div className='flex items-center gap-3'>
                <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                  Color
                </h3>

                <Select
                  data={product.productColors}
                  selected={selectedColor}
                  setSelected={setSelectedColor}
                  className='w-24'
                />
              </div>
            ) : null}
          </div>

          {selectError ? (
            <p className='text-xs text-red-600 leading-3 bg-red-200 p-1 font-bold'>
              {selectError}
            </p>
          ) : null}

          {product.stockStatus === 'in-stock' ? (
            <div className='mt-8 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-start lg:flex-col xl:flex-row'>
              <QuantityPicker
                onDecrease={decreaseProductQuantity}
                onIncrease={increaseProductQuantity}
                quantity={productQuantity}
              />

              <button
                onClick={() => {
                  if (
                    product.productColors.length &&
                    selectedColor === 'Select'
                  ) {
                    setSelectError('Please select a color')
                    return
                  }
                  addToCart(cartProduct, productQuantity)
                  setSelectError('')
                  toast.success(`🥳 '${product.name}' added to your cart`)
                }}
                type='button'
                className='w-full border rounded border-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main hover:text-white active:scale-95'>
                Add to cart
              </button>
            </div>
          ) : (
            <div className='mt-8 text-sm bg-gray-200 p-2 text-center'>
              <p>Product is currently out of stock.</p>
              <p>
                Kindly check back or{' '}
                <Link href='/contact' className='text-main underline'>
                  contact us
                </Link>{' '}
                to request.
              </p>
            </div>
          )}

          <ProductFooter />
        </section>
      </main>

      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ProductDetails
