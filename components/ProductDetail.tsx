import { Product } from 'models/productsModel'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from 'utils/formatCurrency'
import { getPercentageDecrease } from 'utils/getPercentage'

type ProductDetailProps = {
  product: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Link
      href={`/shop/product/${product.slug}`}
      className='group transition-colors'>
      <div className='relative'>
        <Image
          alt='product'
          src={product.image.sourceUrl}
          width={1080}
          height={320}
          className='h-80 lg:h-[35rem] rounded object-cover object-top'
        />
        {product.onSale ? (
          <p className='absolute top-3 right-3 bg-[#333333] text-white py-2 px-4 text-xs font-bold rounded tracking-wider'>
            {getPercentageDecrease(+product.salePrice, +product.regularPrice)}%
          </p>
        ) : null}
      </div>
      <div className='text-center'>
        <p className='pt-6 font-bold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 text-xs md:tracking-[4px]'>
          {product.name}
        </p>
        <div className='flex items-center justify-center gap-2 pt-2'>
          {product.onSale ? (
            <p className='text-xs text-[#8c8c8c] line-through'>
              {formatCurrency(+product.regularPrice)}
            </p>
          ) : (
            <p className='text-xs text-[#8c8c8c] font-bold'>
              {formatCurrency(+product.regularPrice)}
            </p>
          )}
          {product.onSale ? (
            <p className='text-xs text-[#8c8c8c] font-bold'>
              {formatCurrency(+product.salePrice)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
