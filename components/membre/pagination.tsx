import React from "react"
import { Pagination } from "react-bootstrap"
import usePaginationLogics from "~hooks/usePagination"

type PaginationMemberType = {
  handleNavigate: Function,
  current: number,
  totalItem: number,
}

const PaginationMember = ({
  handleNavigate,
  current,
  totalItem
}: PaginationMemberType) => {
  const {
    page,
    isPreviousDisabled,
    isNextDisabled,
    totalPage
  } = usePaginationLogics(current, totalItem, 30)

  return (
    <>

      <Pagination className="m-0">
        <Pagination.First 
          disabled={isPreviousDisabled}
          onClick={() => {
            handleNavigate(1)
          }}
        />
        <Pagination.Prev 
          disabled={isPreviousDisabled}
          onClick={() => {
            handleNavigate(current - 1)
          }}
        />
        {
          page.left.map((leftPage, indexLeft) => (
            <Pagination.Item 
              key={`left-page-${indexLeft}`}
              active={leftPage == current}
              onClick={() => {
                handleNavigate(leftPage)
              }}
            >
              {leftPage}
            </Pagination.Item>
          ))
        }
        
        {
          page.leftRange > 0 && (
            <Pagination.Ellipsis />
          )
        }

        {
          page.center.map((centerPage,indexCenter) => (
            <Pagination.Item 
              key={`center-page-${indexCenter}`}
              active={centerPage == current}
              onClick={() => {
                handleNavigate(centerPage)
              }}
            >
              {centerPage}
            </Pagination.Item>
          ))
        }

        {
          page.rightRange > 0 && (
            <Pagination.Ellipsis />
          )
        }

        {   
          page.right.map((rightPage, indexRight) => (
            <Pagination.Item 
              key={`right-page-${indexRight}`}
              active={rightPage == current}
              onClick={() => {
                handleNavigate(rightPage)
              }}
            >
              {rightPage}
            </Pagination.Item>
          ))
        }
        <Pagination.Next 
          disabled={isNextDisabled}
          onClick={() => {
            handleNavigate(current + 1)
          }}
        />
        <Pagination.Last 
          disabled={isNextDisabled}
          onClick={() => {
            handleNavigate(totalPage)
          }}
        />
      </Pagination>
    </>
   
  )
}

export default React.memo(PaginationMember)