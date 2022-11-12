import { BrundCrumbType } from "~hooks/useBrudcrumb"
import { GetUsersQueryType } from "~repositories/users"
import moment from 'moment';
import { ROLE_TYPES } from "~constantes/user-roles";
import { USER_TYPES } from "~constantes/user-types";

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

  tmp.role = parseInt(tmp.role)
  tmp.userType = parseInt(tmp.userType)

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
  if(query['userType']) queryParams['userType'] = query['userType'];
  if(query['userInfo.phone']) queryParams['userInfo.phone'] = query['userInfo.phone'];
  if(query['userInfo.address']) queryParams['userInfo.address'] = query['userInfo.address'];
  if(query['username']) queryParams['username'] = query['username'];

  return queryParams
}

export const formatDate = (date: string) => {
  return date 
    ? moment(date).format('YYYY-MM-DD HH:mm')
    : ''
}

export const formatRoleType = (type: number) => {
  let roleType: any = ROLE_TYPES.find(element => element.value == type)

  return roleType.name
}

export const formatUserType = (type: number) => {
  let userType: any = USER_TYPES.find(item => item.value == type)

  return userType.name
}