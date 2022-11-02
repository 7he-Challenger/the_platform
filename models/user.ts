export interface User {
  id: any;
  username: string;
  firstname: string
  lastname: string;

}


export type TUserPayload = {
  username?: string
  firstname?: string
  lastname?: string
  userInfo?: {
    address?: string
    phone?: string
    photos?: string
  }
  password?: string
  userType?: number
  role?: number
  cover?: string
}