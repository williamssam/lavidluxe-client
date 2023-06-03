import { Cart } from 'components/Cart'
import { Footer } from 'components/Footer'
import Header from 'components/Header'
import ScrollToTopBtn from 'components/ScrollToTopBtn'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { openCartDrawer } from 'store/atoms'

export const Layout = ({ children }: PropsWithChildren) => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)
  const router = useRouter()

  return (
    <>
      <Header />

      {children}

      {!router.pathname.includes('shop') ? <Footer /> : null}

      {openCart ? <Cart /> : null}
      <ScrollToTopBtn />
    </>
  )
}
