import ENDPOINT from "~constantes/enpoint"
import axiosInstance from "~lib/axios"

export const login = async (
  username: string, 
  password: string
) => {
  const body = {
    username,
    password
  }
  const axios = axiosInstance()

  const result = await axios.post(
    ENDPOINT.LOGIN,
    body
  )

  return result.data
}