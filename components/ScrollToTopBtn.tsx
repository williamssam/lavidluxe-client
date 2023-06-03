import { ArrowUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

const ScrollToTopBtn = () => {
  const [showBtn, setShowBtn] = useState(false)

  const showBtnHandler = () => {
    if (window.scrollY > 500) {
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', showBtnHandler)
    return () => window.removeEventListener('scroll', showBtnHandler)
  }, [])

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={`fixed bottom-8 right-0 grid h-10 w-10 place-items-center rounded-full bg-main text-white transition-all hover:bg-dark hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-main active:scale-95 ${
        showBtn ? '-translate-x-full' : 'translate-x-full'
      }`}>
      <ArrowUpIcon className='h-6 w-6' />
      <span className='sr-only'>Scroll to top</span>
    </button>
  )
}
export default ScrollToTopBtn
