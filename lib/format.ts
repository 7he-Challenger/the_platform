import { BrundCrumbType } from "~hooks/useBrudcrumb"

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