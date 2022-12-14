import { useRouter } from 'next/router'

export const Breadcrumbs = () => {
  const router = useRouter()
  return (
    <p className='flex items-center gap-2 text-xs tracking-wider text-gray-400  '>
      <span>home</span>/<span>store</span>/<span>product name</span>
    </p>
  )
}
