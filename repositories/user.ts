import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export type GetUserQueryType = {
  page?: number,
  username?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  isEnable?: boolean | null,
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