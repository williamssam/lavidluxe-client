import { atom } from 'jotai'

type UserInfo = {
  // name: string
  firstName: string
  lastName: string
  email: string
  phone_number: string
  address: string
  state: string
  payment_method?: string
  city: string
}

export const userInfo = atom<UserInfo>({
  firstName: '',
  lastName: '',
  email: '',
  phone_number: '',
  address: '',
  payment_method: '',
  state: '',
  city: '',
})

export const openCartDrawer = atom(false)
