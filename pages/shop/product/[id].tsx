import { ArrowLeftIcon, TruckIcon } from '@heroicons/react/20/solid'
import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Twitter } from 'assets/icon/Twitter'
import Head from 'next/head'

import { QuantityPicker } from 'components/QuantityPicker'
import { Select } from 'components/Select'
import { Timer } from 'components/Timer'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Product } from 'models/productsModel'
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
import { client } from 'utils/apollo/ApolloWrapper'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { GET_FIRST_TEN_PRODUCTS_ID, GET_PRODUCT } from 'utils/gql/queries'

const size = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_FIRST_TEN_PRODUCTS_ID,
  })

  const paths = data.products.nodes?.map((product: Product) => ({
    params: { id: product.id },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async context => {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      id: context.params?.id,
    },
  })

  return {
    props: {
      product: data.product,
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
  // console.log('product', product)

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
    id: product.id,
    image: product.image.sourceUrl,
    name: product.name,
    price: product.salePrice ? product.salePrice : product.regularPrice,
    size: selectedSize,
    color: selectedColor,
    databaseId: product.databaseId,
  }

  // let pageUrl = typeof window !== undefined ? window.location.href : null

  return (
    <>
      <Head>
        <title>Details - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen items-center transition-all grid grid-cols-1 lg:grid-cols-5 overflow-hidden ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <InnerImageZoom
          src={product.image.sourceUrl}
          zoomSrc={product.image.sourceUrl}
          className='mt-16 h-[28rem] bg-main/10 object-cover object-top md:col-span-3 md:mt-0 md:h-[35rem] lg:h-screen'
          zoomType='hover'
          zoomPreload={true}
          fullscreenOnMobile={true}
          imgAttributes={{ alt: product.name }}
        />

        <section className='justify-end self-center px-3 py-5 md:col-span-2 md:px-16 lg:px-10 xl:px-16 md:pb-0'>
          <button
            className='text-xs mb-5 flex items-center gap-2'
            onClick={() => router.back()}>
            <ArrowLeftIcon className='w-4 h-4' />
            Back to shop
          </button>
          <header className='text-center md:text-left flex items-center justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center'>
            <div>
              {product.productTags?.nodes.map(tag => (
                <p
                  className='text-[0.65rem] text-left text-main font-bold'
                  key={tag.slug}>
                  #{tag.name}
                </p>
              ))}
              <h2 className='text-xl font-black uppercase tracking-[3px] text-gray-700 md:text-2xl md:tracking-[5px]'>
                {product.name}
              </h2>

              <div className='flex items-center gap-2 pt-1'>
                {product.onSale ? (
                  <p className='text-sm text-[#8c8c8c] line-through'>
                    {formatCurrency(+product.regularPrice)}
                  </p>
                ) : (
                  <p className='text-sm text-[#8c8c8c] font-bold'>
                    {formatCurrency(+product.regularPrice)}
                  </p>
                )}
                {product.onSale ? (
                  <p className='text-sm text-[#8c8c8c] font-bold'>
                    {formatCurrency(+product.salePrice)}
                  </p>
                ) : null}
              </div>
            </div>

            {product.stockStatus === 'IN_STOCK' ? (
              <p className='uppercase tracking-[3px] text-[0.6rem] py-1 px-2 bg-emerald-100 text-emerald-500 rounded font-black'>
                In stock
              </p>
            ) : null}
            {product.stockStatus === 'OUT_OF_STOCK' ? (
              <p className='uppercase tracking-[3px] text-[0.6rem] py-1 px-2 bg-gray-200 text-gray-500 rounded font-black'>
                Out of stock
              </p>
            ) : null}
          </header>

          {product.onSale ? <Timer deadline={product.dateOnSaleTo} /> : null}

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
            {product.attributes
              ? product.attributes?.nodes.map(attribute => (
                  <div className='flex items-center gap-3' key={attribute.id}>
                    <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                      {attribute.name}
                    </h3>
                    <Select
                      data={attribute.options}
                      selected={selectedColor}
                      setSelected={setSelectedColor}
                      className='w-24'
                    />
                  </div>
                ))
              : null}
          </div>

          {selectError ? (
            <p className='text-xs text-red-600 leading-3 bg-red-200 p-1 font-bold'>
              {selectError}
            </p>
          ) : null}

          {product.stockStatus === 'IN_STOCK' ? (
            <div className='mt-8 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-start lg:flex-col xl:flex-row'>
              <QuantityPicker
                onDecrease={decreaseProductQuantity}
                onIncrease={increaseProductQuantity}
                quantity={productQuantity}
              />

              <button
                onClick={() => {
                  if (product.attributes && selectedColor === 'Select') {
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

          <footer className='mt-10'>
            <p className='text-center text-[0.7rem] font-bold uppercase tracking-[3px] text-main'>
              Free shipping on orders above N100,000
            </p>
            <div className='mt-3 flex flex-col items-center justify-center bg-gray-100 py-4 text-center text-xs text-gray-500 rounded'>
              <TruckIcon className='h-8 w-8 text-gray-600' aria-hidden='true' />
              <p className='px-4 pt-2'>
                We deliver everywhere in{' '}
                <strong className='text-main'>Lagos, Nigeria</strong> and some
                part of Nigeria.
              </p>
              <p className='pt-1'>We deliver within three (3) working days</p>
            </div>

            {/* share product */}
            <div className='mt-8 flex items-center justify-center gap-2 text-sm md:justify-end'>
              <p>Share product on:</p>

              <ul className='flex items-center gap-2'>
                <li>
                  <a
                    // href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-colors hover:text-gray-800'>
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-colors hover:text-gray-800'>
                    <Instagram />
                  </a>
                </li>
                <li>
                  <a
                    // href={`https://twitter.com/intent/tweet?text=${pageUrl}`}
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-colors hover:text-gray-800'>
                    <Twitter />
                  </a>
                </li>
              </ul>
            </div>
          </footer>
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
