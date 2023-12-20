import { HeartIcon } from '@heroicons/react/20/solid'
import { Product } from 'models/productModel'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useWishlistsStore } from 'store/wishlistsStore'
import { blurDataURL } from 'utils/dataURl'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { getPercentageDecrease } from 'utils/functions/getPercentage'
import { urlFor } from 'utils/sanity/client'

type ProductDetailProps = {
  product: Product
  category: string
}
export const ProductDetail = ({ product, category }: ProductDetailProps) => {
  const addToWishlist = useWishlistsStore(state => state.addToWishlist)
  const wishlists = useWishlistsStore(state => state.wishlists)
  const removeFromWishlist = useWishlistsStore(
    state => state.removeFromWishlist
  )

  return (
    <div className='group transition-colors'>
      <div className='relative h-96 overflow-hidden rounded lg:h-[35rem]'>
        <Link href={`/shop/${category}/${product.slug.current}`}>
          <Image
            alt={product?.name}
            src={urlFor(product?.image).auto('format').url()}
            fill={true}
            sizes='1080, 560'
            placeholder='blur'
            blurDataURL={blurDataURL}
            className={`rounded object-cover object-top transition-all hover:scale-110 ${
              product?.stockStatus === 'in-stock'
                ? 'grayscale-0'
                : 'opacity-50 grayscale'
            }`}
          />
        </Link>

        {product?.promo?.promoOn ? (
          <p className='absolute top-3 right-3 rounded bg-[#333333] py-2 px-4 text-xs font-bold tracking-wider text-white'>
            {getPercentageDecrease(product?.promo?.promoPrice, product?.price)}%
          </p>
        ) : null}
        {product?.stockStatus !== 'in-stock' ? (
          <p className='absolute top-3 left-3 rounded bg-red-600 py-2 px-4 text-xs font-bold uppercase tracking-wider text-white'>
            Out of stock
          </p>
        ) : null}

        {/* wishlists section */}
        {wishlists.find(wishlist => wishlist._id === product._id) ? (
          <button
            onClick={() => {
              removeFromWishlist(product._id)
              toast.success(`${product?.name} removed from your wishlist!`)
            }}
            title='Remove from wishlist'
            className='absolute bottom-3 left-3 flex items-center gap-1 rounded bg-dark p-1 text-sm text-white transition-all duration-200 hover:bg-main'>
            <HeartIcon className='h-5 w-5' />
            {/* <span>Remove from wishlist</span> */}
          </button>
        ) : (
          <button
            onClick={() => {
              addToWishlist(product, category)
              toast.success(`${product?.name} added to your wishlist! 🎉`)
            }}
            title='Add to wishlist'
            className='absolute bottom-3 left-3 flex items-center gap-1 rounded bg-gray-400 p-1 text-sm text-white transition-all duration-200 hover:bg-gray-600'>
            <HeartIcon
              fill='none'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            />
            {/* <span>Add to wishlist</span> */}
          </button>
        )}
      </div>

      <div className='text-center'>
        <Link
          href={`/shop/${category}/${product.slug.current}`}
          className='inline-block pt-5 text-xs font-bold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 md:tracking-[4px]'>
          {product?.name}
        </Link>
        <div className='flex items-center justify-center gap-3 pt-1'>
          <p
            className={`text-xs text-[#8c8c8c] ${
              product?.promo?.promoOn ? 'line-through' : 'no-underline'
            }`}>
            {formatCurrency(product?.price)}
          </p>
          {product?.promo?.promoOn ? (
            <p className='text-xs font-bold text-[#8c8c8c]'>
              {formatCurrency(product.promo.promoPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
