import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

type GetActivitiesQueryType = {
  page?: number,
  'startDate[before]'?: string,
  'startDate[strictily_before]'?: string,
  'startDate[after]'?: string,
  'startDate[strictily_after]'?: string,
  title?: string,
  description?: string
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