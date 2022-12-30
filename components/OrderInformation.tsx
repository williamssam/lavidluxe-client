import Image from 'next/image'
import hero from 'public/hero.jpg'
import { formatCurrency } from 'utils/formatCurrency'

const price = 17500

export const OrderInformation = () => {
  return (
    <section className='bg-gray-100 border-r h-full col-span-2 p-5 md:px-5 md:py-10 lg:px-10 lg:py-20 xl:p-20'>
      <div className='border-b border-b-gray-300 pb-3'>
        <div className='flex items-center gap-5 border-b border-dashed pb-5'>
          <Image
            src={hero}
            alt='product image'
            className='w-16 object-cover rounded'
          />
          <div className='text-xs font-bold w-full flex items-center justify-between'>
            <div>
              <h4 className='uppercase tracking-[4px] text-[#333333]'>
                The skinny
              </h4>
              <p className='text-[#999999] capitalize pt-1'>Small/blue</p>

              <p className='text-gray-500 pt-3'>Quantity: 10</p>
            </div>

            <p className='text-base font-bold text-[#333333]'>
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </div>

      <div className='border-b border-b-gray-300 py-5'>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Subtotal</p>
          <p className='text-gray-700 font-bold'>$345.00</p>
        </div>
        <div className='flex items-center justify-between mt-2'>
          <p className='text-sm'>Shipping</p>
          <p className='text-gray-700 font-bold'>$35.00</p>
        </div>
      </div>

      <div className='flex items-center justify-between pt-6'>
        <p>Total</p>
        <p className='text-lg text-gray-700 font-bold'>$362.50</p>
      </div>
    </section>
  )
}
