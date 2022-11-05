import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export type GetUsersQueryType = {
  page?: number,
  firstname?: string | null,
  lastname?: string | null,
  userType?: number | null,
  'order[id]'?: string | null
}

/**
 * get users depending on query params provided
 * @param token 
 * @param query 
 */
export const getUsers = async (
  token: string,
  query?: GetUsersQueryType
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
    console.log('error get users')
    throw e
  }
}
/**
 * find user by id
 * @param token 
 * @param id 
 * 
 */
export const findUser = async(
  token: string,
  id: any 
) => {
  const axios = axiosInstance(token)

  try{
    const result = await axios.get(
      `${ENDPOINT.USER}/${id}`,
    )

    return result.data
  }catch(e: any){
    console.log('error find user')
    throw e
  }
}

/**
 * save users
 * provide id for update
 * else for create
 * @param token 
 * @param body 
 * @param id 
 */
export const saveUsers = async (
  token: string,
  body: any,
  id?: any,
) => {
  const axios = axiosInstance(token)
  try{
    const result = id 
      ? await axios.put(
          `${ENDPOINT.USER}/${id}`,
          body
        )
      : await axios.post(
        ENDPOINT.USER,
        body
      )  

    return result.data
  }catch(e: any){
    console.log('error save users')
    throw e
  }
}

/**
 * delete user
 * @param token 
 * @param id 
 */
export const deleteUser = async (
  token: string,
  id: any
) => {
  const axios = axiosInstance(token)
  
  try{
    const result = await axios.delete(
      `${ENDPOINT.USER}/${id}`
    )

    return result.data
  }catch(e: any){
    console.log('error delete user')
    throw e
  }
}