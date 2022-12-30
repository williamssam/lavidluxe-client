import { Tabs } from 'components/Tabs'

type StoreLayoutProps = {
  children: React.ReactNode
}

export const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <>
      <Tabs />

      {children}
    </>
  )
}
