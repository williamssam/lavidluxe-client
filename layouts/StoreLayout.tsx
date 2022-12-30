import { Tabs } from 'components/Tabs'
import { PropsWithChildren } from 'react'

type StoreLayoutProps = {
  children: React.ReactNode
}

export const StoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Tabs />

      {children}
    </>
  )
}
