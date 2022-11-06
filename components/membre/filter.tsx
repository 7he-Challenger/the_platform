import { SyntheticEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { USER_TYPES } from "~constantes/user-types"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faClose, faRefresh, faFilter, faEye, faLock } from "@fortawesome/free-solid-svg-icons"

type MemberFilterType = {
  filter: any,
  submitFilter: Function,
  resetFilter: Function,
  handleFilterChange: Function
}

const MemberFilter = ({
  filter,
  submitFilter = () => {},
  resetFilter = () => {},
  handleFilterChange = () => {}
}: MemberFilterType) => {

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
            <Form.Group className="mb-3" controlId="filterLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Chercher le nom"
                value={filter['lastname'] || ''}
                onChange={(e) => handleFilterChange('lastname', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterUserType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={filter['userType'] || ''}
                onChange={(e) => handleFilterChange('userType', e.target.value)}
              >
                <option value="" selected>Selectionnez un type</option>
                {
                  USER_TYPES.map((userTypes, index) => (
                    <option key={`user-type-${index}`} value={userTypes.value}>
                      {userTypes.name}
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
            Réinitialiser
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MemberFilter