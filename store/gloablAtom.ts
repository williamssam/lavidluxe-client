import { atom } from 'jotai'

type UserInfo = {
  name: string
  email: string
  phone_number: string
  address: string
  state: string
  payment_method?: string
}

export const userInfo = atom<UserInfo>({
  name: '',
  email: '',
  phone_number: '',
  address: '',
  payment_method: '',
  state: '',
})
