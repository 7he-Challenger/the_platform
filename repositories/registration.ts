import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export type GetRegistrationQueryType = {
  page?: number,
  event?: string | null,
}

export const getRegistrations = async (
  token: string,
  query?: GetRegistrationQueryType
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.get(
      ENDPOINT.REGISTRATION,
      {
        params: query ? { ...query } : null
      }
    )
    return result.data
  }catch(e: any){
    console.log('error get registrations')
    throw e
  }
}

/**
 * delete registrations
 * @param token 
 * @param id 
 */
export const deleteRegistrations = async (
  token: string,
  id: any
) => {
  const axios = axiosInstance(token)
  
  try{
    const result = await axios.delete(
      `${ENDPOINT.REGISTRATION}/${id}`
    )

    return result.data
  }catch(e: any){
    console.log('error delete registrations')
    throw e
  }
}

/**
 * update registration
 * @param body 
 */
export const updateInscriptionEvent = async (
  token: string,
  body: any,
  id: any
) => {
  const axios = axiosInstance(token)
  try{
    const result = await axios.put(
      `${ENDPOINT.REGISTRATION}/${id}`,
      body
    )  

    return result.data
  }catch(e: any){
    console.log('error save activities')
    throw e
  }
}