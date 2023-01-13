import { Category } from 'models/productModel'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TabsProps = {
  categories: Category[]
}

export const Tabs = ({ categories }: TabsProps) => {
  const router = useRouter()
  const { slug } = router.query

  console.log('slug', slug)

  return (
    <ul className='mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[0.7rem] font-bold uppercase tracking-widest md:tracking-[3px] text-[#999999] md:mt-10 md:text-[0.69rem] lg:gap-16'>
      {categories.length > 0 ? (
        categories?.map(category => (
          <li key={category._id}>
            <Link
              href={`/shop/${category.slug.current}`}
              className={`relative transition-all md:hover:text-main ${
                slug === category.slug.current ? 'text-main' : 'text-[#8c8c8c]'
              } ${
                slug === category.slug.current
                  ? 'after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-4 after:-translate-x-1/2 after:bg-main hover:text-main md:after:-bottom-3'
                  : ''
              }`}>
              {category.title}
            </Link>
          </li>
        ))
      ) : (
        <li>No category</li>
      )}
    </ul>
  )
}
