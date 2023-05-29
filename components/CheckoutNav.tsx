import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'

export const CheckoutNav = () => {
  const router = useRouter()

  return (
    <div className='flex items-center gap-2 pt-1 text-[0.6rem]'>
      <p
        className={`${
          router.asPath === '/checkout/information'
            ? 'rounded bg-main py-1 px-3 font-black uppercase tracking-widest text-white'
            : 'pl-1 font-bold uppercase tracking-widest text-gray-700'
        }`}>
        Information
      </p>
      <ChevronRightIcon className='h-4 w-4' />
      <p
        className={`${
          router.asPath === '/checkout/payment'
            ? 'rounded bg-main py-1 px-3 font-black uppercase tracking-widest text-white'
            : 'pl-1 font-bold uppercase tracking-widest text-gray-700'
        }`}>
        Payment
      </p>
    </div>
  )
}
