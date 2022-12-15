import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'

export const BackBtn = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className='flex items-center gap-1 mb-1 bg-main text-white px-2 py-1 text-xs rounded transition-all active:scale-95 hover:opacity-80'>
      <ArrowLeftIcon className='w-4 h-4' />
      <span>Back</span>
    </button>
  )
}
