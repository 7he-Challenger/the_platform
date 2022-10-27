import { BrundCrumbType } from "~hooks/useBrudcrumb"
import { GetActivitiesQueryType } from "~repositories/activities"
import moment from "~lib/moment";
import { ACTIVITY_TYPES } from "~constantes/datas";
import { GetPresenceQueryType, GetUserQueryType } from "~repositories/user";
import ROLES from "~constantes/roles";

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
 * format the form data activity to be right formart before seending to post reequest
 * @param form 
 */
export const formatActivityDataForm = (
  form: any
) => {
  const { id, ...data } = form
  let tmp = { ...data }
  tmp.type = parseInt(tmp.type)
  tmp.sponsors = tmp.sponsors.filter((item: any) => item)

  return tmp
}

/**
 * format the query from url to query params of get activities
 * @param query 
 */
export const formatQueryActivityParams = (
  query: any
) => {
  const queryParams: GetActivitiesQueryType = {}

  if(query['page']) queryParams['page'] = query['page'];
  if(query['startDate[before]']) queryParams['startDate[before]'] = query['startDate[before]'];
  if(query['startDate[strictly_before]']) queryParams['startDate[strictly_after]'] = query['startDate[strictly_before]'];
  if(query['startDate[after]']) queryParams['startDate[after]'] = query['startDate[after]'];
  if(query['startDate[strictly_after]']) queryParams['startDate[strictly_after]'] = query['startDate[strictly_after]'];
  if(query['title']) queryParams['title'] = query['title'];
  if(query['description']) queryParams['description'] = query['description'];

  return queryParams
}

/**
 * format the query from url to query params of get users
 * @param query 
 */
export const formatQueryUserParams = (
  query: any 
) => {
  const queryParams: GetUserQueryType = {}
  if(query['page']) queryParams['page'] = query['page'];
  if(query['username']) queryParams['username'] = query['username'];
  if(query['firstname']) queryParams['firstname'] = query['firstname'];
  if(query['lastname']) queryParams['lastname'] = query['lastname'];
  if(query['isEnable']) queryParams['isEnable'] = query['isEnable'];

  return queryParams
}

/**
 * format the query from url to query params of get activities
 * @param query 
 */
 export const formatQueryPresenceParams = (
  query: any
) => {
  const queryParams: GetPresenceQueryType = {}

  if(query['page']) queryParams['page'] = query['page'];
  
  if(query['date[strictly_after]']) queryParams['date[strictly_after]'] = query['startDate[strictly_after]'];
  if(query['isPresent'] != null) queryParams['isPresent'] = query['isPresent'];
  if(query['user.username']) queryParams['user.username'] = query['user.username'];

  return queryParams
}

export const formatDate = (date: string) => {
  return date 
    ? moment(date).format('YYYY-MM-DD HH:mm')
    : ''
}

export const formateActivityType = (type: number) => {
  let activityType: any = ACTIVITY_TYPES.find(item => item.value == type)
  return activityType.name
}

/**
 * format presences for statistics
 * @param presences 
 */
export const formatPresenceData = (presences: Array<any>) => {
  const months = moment.monthsShort()
  // get presence statistics for date
  const presence = presences.reduce((acc, item) => {
    const date = moment(item.date).format('YYYY-MM-DD')
    const indexLabel = acc.labels.findIndex((el: string) => el == date)
    if(indexLabel > -1){
      acc.counts[indexLabel] = acc.counts[indexLabel] != undefined
        ? acc.counts[indexLabel] + 1
        : 1
    }else{
      acc.counts.push(1)
      acc.labels.push(date)
    }

    return acc
  }, {
    labels: [],
    counts: []
  })

  // get average presence of current year by month
  const averagePresence = getPresenceByYear(presences).reduce((acc, item) => {
    const date = moment(item.date).format('MMM')
    const indexLabel = months.findIndex((el: string) => el == date)
    if(indexLabel > -1){
      acc[indexLabel] = acc[indexLabel] + 1
    }
    return acc
  }, months.map(() => (0)))
  
  return {
    presence,
    averagePresence
  }
}

export const getPresenceByYear = (presences: Array<any>) => {
  return presences.filter(item => moment(item.date).isSame(new Date(), 'year'))
} 

/**
 * format list users to get registered member only
 * @param users 
 */
export const formatRegisteredMember = (
  users: Array<any>
) => {
  return users.reduce((acc, item) => {
    if(item.roles.includes(ROLES.ROLE_MEMBER)) acc.push(item)
    return acc
  }, [])
}

export const formatStatisticsRegisteredMember = (
  users: Array<any>,
  years: Array<any>,
  months: Array<any>
) => {
  const valueYear = Array.from({length: years.length}, (_,i) => (0))
  const valueMonth = Array.from({length: months.length}, (_,i) => (0))
  
  const registeredYear = users.reduce((acc, item) => {
    const date = parseInt(moment(item.createdAt).format('YYYY'))
    const index = years.findIndex(el => el == date)
    acc[index] = acc[index] + 1;
    return acc
  }, [...valueYear])

  const registeredMonth = getMemberYear(users).reduce((acc: any, item: any) => {
    const date = parseInt(moment(item.createdAt).format('MMM'))
    const index = months.findIndex(el => el == date)
    acc[index] = acc[index] + 1;
    return acc
  }, [...valueYear])

  return {
    registeredYear,
    registeredMonth
  }
}

export const getMemberYear = (
  users: Array<any>
) => {
  return users.reduce((acc, item) => {
    if(moment(item.createdAt).isSame(new Date(), 'year')) acc.push(item)
    return acc
  }, [])
}