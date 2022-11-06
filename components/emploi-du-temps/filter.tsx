import { SyntheticEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { faBan, faCheck, faClose, faPencil, faRefresh, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ActivityFilterType = {
  filter: any,
  submitFilter: Function,
  resetFilter: Function,
  handleFilterChange: Function
}

const ActivityFilter = ({
  filter,
  submitFilter = () => {},
  resetFilter = () => {},
  handleFilterChange = () => {}
}: ActivityFilterType) => {

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
              <Form.Label>Après le</Form.Label>
              <Form.Control 
                type="date"
                value={filter['startDate[after]'] || ''}
                onChange={(e) => handleFilterChange('startDate[after]', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterDateBefore">
              <Form.Label>Avant le</Form.Label>
              <Form.Control 
                type="date"
                value={filter['startDate[before]'] || ''}
                onChange={(e) => handleFilterChange('startDate[before]', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Chercher titre"
                value={filter['title'] || ''}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterPublic">
              <Form.Label>Activité privée</Form.Label>
              <Form.Check 
                type="checkbox" 
                label="Privée" 
                checked={
                  filter['isPublic'] != null
                }
                onChange={
                  (e) => handleFilterChange(
                    'isPublic', 
                    filter['isPublic'] == false ? null : false
                  )
                }
              />
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

export default ActivityFilter