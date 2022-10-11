import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap'
import useBrudcrumb from '~hooks/useBrudcrumb'

export default function Breadcrumb() {
  const {
    brundCrumb
  } = useBrudcrumb()

  return (
    <BSBreadcrumb listProps={{ className: 'my-0 ms-2 align-items-center' }}>
      {
        brundCrumb.map((item, index) => (
          <BSBreadcrumb.Item
            key={`brundcrumb-${index}`}
            linkProps={{ className: index < brundCrumb.length - 1 ? 'text-decoration-none' : '' }}
            href={index < brundCrumb.length - 1 ? item.url : ''}
            active={index < brundCrumb.length - 1 ? false : true}
          >
            { item.name }
          </BSBreadcrumb.Item>
        ))
      }
    </BSBreadcrumb>
  )
}
