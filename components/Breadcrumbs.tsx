import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// TODO: redo this component and make it reusable
export const Breadcrumbs = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<string | string[]>('')

  useEffect(() => {
    const pathname = router.pathname.split('/').filter(Boolean)
    setBreadcrumbs(pathname)
  }, [router.pathname])

  return (
    <p className='flex items-center gap-1 capitalize text-xs tracking-wider text-gray-400'>
      <Link className='hover:text-main transition-colors' href='/'>
        Home
      </Link>
      /
      <Link
        className='hover:text-main transition-colors'
        href={`/${breadcrumbs[0]}/all`}>
        {breadcrumbs[0]}
      </Link>
      /
      <Link
        className='hover:text-main transition-colors font-bold text-main'
        href={`/${breadcrumbs[0]}/${breadcrumbs[1]}`}>
        {breadcrumbs[1]}
      </Link>
    </p>
  )
}
