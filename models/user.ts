export interface User {
  '@id'?: any,
  id: any
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  role?: number
  userType?: number
  cover?: {
    contentUrl?: string
  }
  picture?: File
}
  
export type UserType = {
  id?: any | null
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  role?: number
  userType?: number | null
  createdAt?: string
  userInfo? : {
    address?: string|null
    phone?: string|null
    photo?: string|null
  }
  cover?: string
  picture?: File
}