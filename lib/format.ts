import { BrundCrumbType } from "~hooks/useBrudcrumb"
import { GetActivitiesQueryType } from "~repositories/activities"

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
  if(query['startDate[strictily_before]']) queryParams['startDate[strictily_before]'] = query['startDate[strictily_before]'];
  if(query['startDate[after]']) queryParams['startDate[after]'] = query['startDate[after]'];
  if(query['startDate[strictily_after]']) queryParams['startDate[strictily_after]'] = query['startDate[strictily_after]'];
  if(query['title']) queryParams['title'] = query['title'];
  if(query['description']) queryParams['description'] = query['description'];

  return queryParams
}