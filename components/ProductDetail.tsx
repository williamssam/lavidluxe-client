import { Product } from 'models/productModel'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from 'utils/functions/formatCurrency'

type ProductDetailProps = {
  product: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Link
      href={`/shop/product/${product.id}`}
      className='group transition-colors'>
      <div className='relative h-80 lg:h-[35rem] overflow-hidden rounded'>
        <Image
          alt={product.name}
          src={product.images[0].url}
          fill={true}
          sizes='1080, 560'
          className={`rounded object-cover object-top hover:scale-110 transition-all ${
            product.stockStatus.name === 'In Stock'
              ? 'grayscale-0'
              : 'grayscale'
          }`}
        />
        {/* {product.onSale ? (
          <p className='absolute top-3 right-3 bg-[#333333] text-white py-2 px-4 text-xs font-bold rounded tracking-wider'>
            {getPercentageDecrease(+product.salePrice, +product.regularPrice)}%
          </p>
        ) : null} */}
        {/* {product.stockStatus.name === 'In Stock' ? (
          <p className='absolute top-3 left-3 bg-[#333333] text-white uppercase py-2 px-4 text-xs font-bold rounded tracking-wider'>
            Out of stock
          </p>
        ) : null} */}
      </div>
      <div className='text-center'>
        <p className='pt-5 font-bold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 text-xs md:tracking-[4px]'>
          {product.name}
        </p>
        <div className='flex items-center justify-center gap-2 pt-[0.4rem]'>
          <p className='text-xs text-[#8c8c8c] font-bold'>
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  )
}
