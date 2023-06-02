import { atom } from 'jotai'

type UserInfo = {
  // name: string
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  address: string
  state: string
  paymentMethod?: string
  city: string
  orderNote?: string
}

export const userInfo = atom<UserInfo>({
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  address: '',
  paymentMethod: '',
  state: '',
  city: '',
  orderNote: '',
})

export const openCartDrawer = atom(false)
