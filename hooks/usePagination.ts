import { useEffect, useState } from "react"

const usePaginationLogics = (
  currentPage: number,
  totalItem: number,
  pageByItem: number = 10
) => {
  const [page, setPage] = useState({
    left: [],
    center: [],
    right: [],
    leftRange: 0,
    rightRange: 0
  })

  const totalPage = Math.ceil(totalItem / pageByItem) == 0 
    ? 1 
    : Math.ceil(totalItem / pageByItem)

  const isPreviousDisabled = currentPage == 1
  const isNextDisabled = currentPage == totalPage

  useEffect(() => {
    if(totalItem > 0){
      const tmp: any = {
        left: [],
        center: [],
        right: [],
        leftRange: 0,
        rightRange: 0
      }
      // set left side page
      for(let i = 1; i <= 4; i++){
        if(i <= totalPage){
          tmp.left.push(i)
        }
      }
  
      // set right side page
      for(let i = totalPage; i >= totalPage - 3; i--){
        if(i > 0 && !tmp.left.find((el: number) => el == i)){
          tmp.right.unshift(i)
        }else{
          break;
        }
      }
      
      // get the central page on center side
      let centerBegin = 1;
      if(
        !tmp.left.find((el: number) => el == currentPage)
        && !tmp.right.find((el: number) => el == currentPage)
      ){
        centerBegin = currentPage 
      }else{
        centerBegin = Math.round(totalPage / 2)
      }

      // set central page
      for(let i = centerBegin - 1; i <= centerBegin + 1; i++){
        if(
          i  > 0
          && i < totalPage
          && !tmp.left.find((el: number) => el == i)
          && !tmp.right.find((el: number) => el == i)
        ){
          tmp.center.push(i)
        }
      }
  
      // set range left
      if(
        tmp.left.length > 0
        && tmp.center.length > 0
      ){
        tmp.leftRange = tmp.center[0] - tmp.left[0]
      }
  
      // set range right
      if(
        tmp.right.length > 0
        && tmp.center.length > 0
      ){
        tmp.rightRange = tmp.right[0] - tmp.center[0]
      }
      setPage(tmp)
    }
  }, [currentPage, totalItem])

  return {
    page,
    isPreviousDisabled,
    isNextDisabled,
    totalPage
  }
}

export default usePaginationLogics