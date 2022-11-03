import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"
import { TUserPayload } from "~models/user"

export type GetUserQueryType = {
  page?: number,
  username?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  isEnable?: boolean | null,
  roleInt?: number | null,
  userType?: number | null,
}

export type GetPresenceQueryType = {
  page?: number,
  isPresent?: 0 | 1 | null,
  'user.username'?: string | null,
  'date[strictly_after]'?: string | null,
}

/**
 * get all users list
 * @param token 
 */
export const getAllUser = async (
  token: string,
  query?: GetUserQueryType
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.get(
      ENDPOINT.USER,
      {
        params: query ? { ...query } : null
      }
    )
    return result.data
  }catch(e: any){
    console.log('error get activities')
    throw e
  }
}

/**
 * get all presence
 * @param token 
 * @param query 
 */
export const getAllPresence = async (
  token: string,
  query?: GetPresenceQueryType
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.get(
      ENDPOINT.PRESENCES,
      {
        params: query ? { ...query } : null
      }
    )
    return result.data
  }catch(e: any){
    console.log('error get presences year')
    throw e
  }
}

export const getOneUser = async (
  token: string,
  id: string
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.get(
      `${ENDPOINT.USER}/${id}`
    )
    return result.data
  }catch(e: any){
    console.log('error get one user')
    throw e
  }
}

/**
 * 
 * @param token 
 * @param id the id to update
 * @param data the payload to update
 */
export const updateOneUser = async (
  token: string,
  id: string,
  data: TUserPayload
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.put(
      `${ENDPOINT.USER}/${id}`,
      data
    )
    return result.data
  }catch(e: any){
    console.log('error update one user')
    throw e
  }
}