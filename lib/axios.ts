import Axios from 'axios';
/**
 * configuration axios if neede
 * change config depending on how using axios and credential
 * 
 * The token is provided from the caller 
 * from the ~lib/example.ts check example how to get token depending on side using
 * if trying using axios in server side props fetching 
 * check getServerSideProps function
 * else
 * check Component example
 * Component example way can be used on custom hooks
 */

const axiosInstance = (
  token: string | null = null,
  accept: boolean = false,
  media: boolean = false
) => {
  const option = token ? {
    Accept: accept ? 'application/ld+json' : 'application/json',
    'Content-Type': media ? 'multipart/form-data' : 'application/json',
    Authorization: `Bearer ${token}`
  } : {
    Accept: accept ? 'application/ld+json' : 'application/json',
    'Content-Type': media ? 'multipart/form-data' : 'application/json',
  }

  const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: option,
    // withCredentials: true
  })

  axios.interceptors.response.use(
    response => response,
    error => {
      console.log('error axios', error)
      return Promise.reject(error)
    }
  )

  return axios
}

export default axiosInstance