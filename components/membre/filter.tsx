import { SyntheticEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

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
          {/* <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterDateBefore">
              <Form.Label>Entre le</Form.Label>
              <Form.Control 
                type="date"
                value={filter['createdAt'] || ''}
                onChange={(e) => handleFilterChange('createdAt', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterDateAfter">
              <Form.Label>et le</Form.Label>
              <Form.Control 
                type="date"
                value={filter['createdAt'] || ''}
                onChange={(e) => handleFilterChange('createdAt', e.target.value)}
              />
            </Form.Group>
          </Col> */}

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="filterTitle">
              <Form.Label>Nom</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Chercher le nom"
                value={filter['lastname'] || ''}
                onChange={(e) => handleFilterChange('lastname', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div>
          <Button variant="primary" type="submit">
            Filtrer
          </Button>

          <Button variant="dark" type="button" className="mx-2" onClick={() => {resetFilter()}}>
            Réinitialiser
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MemberFilter