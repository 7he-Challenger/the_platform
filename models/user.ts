export interface User {
  '@id'?: any,
  id: any
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  roles?: Array<string>
}
  
export type UserType = {
  id: any | null
  username?: string
  password?: string
  firstname?: string
  lastname?: string
  roles?: Array<string>
  createdAt?: string
}