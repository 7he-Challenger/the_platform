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

export const getActivities = async (
  token: string,
  query?: GetActivitiesQueryType
) => {
  const axios = axiosInstance(token)

  try{
    const result = await axios.get(
      ENDPOINT.ACTIVITY.GET_ALL,
      {
        params: query ? { ...query } : null
      }
    )

    return result.data
  }catch(e: any){
    console.log('error get activities')
    if(e.response.status == 401){
      console.log('error token')
    }else{
      console.log('error server', e)
    }
    return null
  }
}