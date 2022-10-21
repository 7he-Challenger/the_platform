import { SyntheticEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

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
        </Row>
        <div>
          <Button variant="primary" type="submit">
            Filtrer
          </Button>

          <Button variant="dark" type="button" className="mx-2" onClick={() => {resetFilter()}}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ActivityFilter