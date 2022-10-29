export interface User {
  '@id'?: any,
  id: any
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  role?: number
  userType?: number
}
  
export type UserType = {
  id: any | null
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  role?: number
  userType?: number | null
  address?: string
  phone?: string
  photo?: string
  createdAt?: string
}