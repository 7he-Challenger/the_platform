import { SyntheticEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { faBan, faCheck, faClose, faPencil, faRefresh, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type RegistrationFilterType = {
  filter: any,
  submitFilter: Function,
  resetFilter: Function,
  handleFilterChange: Function,
  activities: Array<any>
}

const RegistrationFilter = ({
  filter,
  submitFilter = () => {},
  resetFilter = () => {},
  handleFilterChange = () => {},
  activities = []
}: RegistrationFilterType) => {

  const submitForm = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    submitFilter()
  }

  return (
    <div className="my-2">
      <form onSubmit={submitForm}>
        <Row>
          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterDateAfter">
              <Form.Label>Evènement</Form.Label>
              <Form.Select 
                aria-label="Selectionnez un rôle"
                value={filter.event}
                onChange={(e) => handleFilterChange('event', e.target.value)}
              >
                <option value="">---</option>
                {
                  activities.map((activity, index) => (
                    <option key={`activity-item-${index}`} value={activity.id}>
                      {activity.title}
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
            &nbsp;
            Filtrer
          </Button>

          <Button variant="warning" type="button" className="mx-2" onClick={() => {resetFilter()}}>
            <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
            &nbsp;
            Reinitialiser
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationFilter