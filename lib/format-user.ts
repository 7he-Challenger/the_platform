import { BrundCrumbType } from "~hooks/useBrudcrumb"
import { GetUsersQueryType } from "~repositories/users"
import moment from 'moment';
import { ROLE_TYPES } from "~constantes/roles-user";

/**
 * format the route path into name title
 * @param route 
 */
export const formatRouteName = (
  route: string
) => {
  return `${route.charAt(0).toUpperCase()}${route.slice(1)}`.replaceAll('-', ' ')
}

/**
 * generate an array of brundcrumb from route path
 * @param route 
 */
export const generateBrundCrumb = (
  route: string
) => {
  let path = route.split('/')
  if(path[0] == '') path.shift()
  const tmpBrundcrumb: BrundCrumbType[] = path.reduce((
    acc, 
    item, 
    index
  ) => {
    acc.push({
      name: formatRouteName(item),
      url: index == 0
        ? `/${item}`
        : `${acc[index - 1].url}/${item}`
    })
    return acc
  }, <BrundCrumbType[]>[])

  return tmpBrundcrumb
}

/**
 * format the form data user to be right formart before seending to post reequest
 * @param form 
 */
export const formatUserDataForm = (
  form: any
) => {
  const { id, ...data } = form
  let tmp = { ...data }
  // tmp.type = parseInt(tmp.type)
  // tmp.roles = tmp.roles.filter((item: any) => item)

  return tmp
}

/**
 * format the query from url to query params of get activities
 * @param query 
 */
export const formatQueryUserParams = (
  query: any
) => {
  const queryParams: GetUsersQueryType = {}

  if(query['page']) queryParams['page'] = query['page'];
  if(query['firstname']) queryParams['firstname'] = query['firstname'];
  if(query['lastname']) queryParams['lastname'] = query['lastname'];

  return queryParams
}

export const formatDate = (date: string) => {
  return date 
    ? moment(date).format('YYYY-MM-DD HH:mm')
    : ''
}

export const formateUserType = (type: any) => {
  let userType: any = ROLE_TYPES.find(element => element.value == type.toString())

  return userType.name
}