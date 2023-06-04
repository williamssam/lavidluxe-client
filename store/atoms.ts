import { atom } from 'jotai'

type UserInfo = {
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  address: string
  state: string
  paymentMethod?: string
  city: string
  orderNote?: string
  deliveryMethod: 'ship' | 'pick up'
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
  deliveryMethod: 'ship',
})

export const openCartDrawer = atom(false)
