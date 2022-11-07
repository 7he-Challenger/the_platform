import { setCookie, destroyCookie, parseCookies } from 'nookies'

/**
 * Get cookies client side
 * @param key 
 */
export const getCookiesData = (key: string) => {
  const cookies = parseCookies()
  return cookies[key]
}

/**
 * Set cookies client side
 * @param key 
 * @param value 
 * @param maxAge 
 * @param path 
 */
export const setCookiesData = (
  key: string, 
  value: string,
  req: any = null,
  maxAge: number = 3600,
  path: string = '/'
) => {
  setCookie(req, key, value, {
    maxAge,
    path,
  })
}

export const removeCookiesData = (key: string) => {
  destroyCookie(null,key)
}