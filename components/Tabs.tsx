import { Category } from 'models/productModel'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TabsProps = {
  categories: Category[]
}

export const Tabs = ({ categories }: TabsProps) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <ul className='mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-[0.7rem] font-bold uppercase tracking-widest text-[#999999] md:mt-10 md:gap-8 md:text-[0.69rem] md:tracking-[3px] lg:gap-16'>
      {categories?.length > 0 ? (
        categories?.map(category => (
          <li key={category._id}>
            <Link
              href={`/shop/${category.slug.current}`}
              className={`relative transition-all md:hover:text-main ${
                slug === category.slug.current
                  ? 'font-black text-main after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-6 after:-translate-x-1/2 after:bg-main hover:text-main md:after:-bottom-3'
                  : 'font-normal text-[#8c8c8c]'
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
