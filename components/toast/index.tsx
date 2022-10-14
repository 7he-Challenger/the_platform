import { useEffect } from "react"
import { Toast } from "react-bootstrap"
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useAppDispatch, useAppSelector } from "~store/hooks"
import { setToast } from "~store/toast"
import { selectToast } from "~store/toast/selector"

const ToastComponent = () => {
  const dispatch = useAppDispatch()
  const {
    message,
    show,
    type
  } = useAppSelector(selectToast)

  const close = () => dispatch(setToast(null))

  return (
    <ToastContainer position="top-end" containerPosition="position-fixed">
      <Toast onClose={close} show={show} animation={true} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastComponent