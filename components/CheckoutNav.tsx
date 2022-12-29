import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const CheckoutNav = () => {
  const router = useRouter()

  return (
    <div className='text-[0.6rem] pt-1 flex items-center gap-2'>
      <Link
        href='/checkout/information'
        className={`${
          router.asPath === '/checkout/information'
            ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
            : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
        }`}>
        Information
      </Link>
      <ChevronRightIcon className='w-4 h-4' />
      <Link
        href='/checkout/shipping'
        className={`${
          router.asPath === '/checkout/shipping'
            ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
            : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
        }`}>
        Shipping
      </Link>
    </div>
  )
}
