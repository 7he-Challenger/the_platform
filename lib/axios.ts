import Axios from 'axios';

/**
 * configuration axios if neede
 * change config depending on how using axios and credential
 */
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
		'Content-type': 'application/json',
  },
  withCredentials: true
})

export default axios