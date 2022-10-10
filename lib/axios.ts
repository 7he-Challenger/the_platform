import Axios from 'axios';
import COOKIES_KEY from '~constantes/cookies';
import { getCookiesData } from '~lib/cookies';

/**
 * configuration axios if neede
 * change config depending on how using axios and credential
 */

const token = getCookiesData(COOKIES_KEY.TOKEN_SESSION)

const option = token ? {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`
} : {
  Accept: 'application/json'
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

export default axios