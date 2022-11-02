import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export const uploadFiles = async (
  token: string,
  files: Array<any>
) => {
  const axios = axiosInstance(token, true, true)

  try{
    const filesDataRequest: any = []
    files.forEach(item => {
      if(typeof item == 'object' && item.file){
        var formData = new FormData();
        formData.append("file", item.file); 

        filesDataRequest.push(
          axios.post(
            `${ENDPOINT.MEDIA}`,
            formData
          ) 
        )
      }
    })

    const result = await Promise.all(filesDataRequest)
    const toReturn: any = []
    result.map((res: any) => {
      if(res && res.status == 201){
        toReturn.push(res.data['@id'])
      }
    })
    return toReturn
  }catch(e: any){
    console.log('error save media')
    throw e
  }
}