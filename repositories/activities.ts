import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export type GetActivitiesQueryType = {
  page?: number,
  'startDate[before]'?: string | null,
  'startDate[strictly_after]'?: string | null,
  'startDate[after]'?: string | null,
  'startDate[strictly_before]'?: string | null,
  'order[id]'?: string | null,
  title?: string | null,
  description?: string | null,
  isPublic?: 0 | 1 | null
}

/**
 * get activities depending on query params provided
 * @param token 
 * @param query 
 */
export const getActivities = async (
  token: string,
  query?: GetActivitiesQueryType
) => {
  const axios = axiosInstance(token, true)

  try{
    const result = await axios.get(
      ENDPOINT.ACTIVITY,
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
 * find activity by id
 * @param token 
 * @param id 
 * 
 */
export const findActivity = async(
  token: string,
  id: any 
) => {
  const axios = axiosInstance(token)

  try{
    const result = await axios.get(
      `${ENDPOINT.ACTIVITY}/${id}`,
    )

    return result.data
  }catch(e: any){
    console.log('error find activity')
    throw e
  }
}

/**
 * save activities
 * provide id for update
 * else for create
 * @param token 
 * @param body 
 * @param id 
 */
export const saveActivities = async (
  token: string,
  body: any,
  id?: any,
) => {
  const axios = axiosInstance(token)
  try{
    const result = id 
      ? await axios.put(
          `${ENDPOINT.ACTIVITY}/${id}`,
          body
        )
      : await axios.post(
        ENDPOINT.ACTIVITY,
        body
      )  

    return result.data
  }catch(e: any){
    console.log('error save activities')
    throw e
  }
}

/**
 * delete activity
 * @param token 
 * @param id 
 */
export const deleteActivity = async (
  token: string,
  id: any
) => {
  const axios = axiosInstance(token)
  
  try{
    const result = await axios.delete(
      `${ENDPOINT.ACTIVITY}/${id}`
    )

    return result.data
  }catch(e: any){
    console.log('error delete activity')
    throw e
  }
}

/**
 * get activity by id activity
 * @param id 
 */
export const getActivityById = async (
  id: string
) => {
  const axios = axiosInstance(null, true)

  try{
    const result = await axios.get(
      `${ENDPOINT.ACTIVITY}/${id}`
    )

    return result.data
  }catch(e: any){
    console.log('error get activity by id', e)
    throw e
  }
}

export const getPublicActivity = async () => {
  const axios = axiosInstance()

  try{
    const result = await axios.get(
      `${ENDPOINT.ACTIVITY}`,
      {
        params: {
          isPublic: 1
        }
      }
    )

    return result.data
  }catch(e: any){
    console.log('error get activity by id', e)
    throw e
  }
}

export const saveInscriptionEvent = async (
  body: any
) => {
  const axios = axiosInstance()
  try{
    const result = await axios.post(
      ENDPOINT.REGISTRATION,
      body
    )  

    return result.data
  }catch(e: any){
    console.log('error save activities')
    throw e
  }
}