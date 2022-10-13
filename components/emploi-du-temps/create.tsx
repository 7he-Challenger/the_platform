import { Button, Col, Form, Row } from "react-bootstrap";

type CreateEmploiDuTempsType = {
  toUpdate?: any,
}

const CreateEmploiDuTemps = ({
  toUpdate = null
}: CreateEmploiDuTempsType) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formTheme">
        <Form.Label>Thème *</Form.Label>
        <Form.Control type="text" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIntervenant">
        <Form.Label>Intervenant(e) *</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLieu">
        <Form.Label>Lieu *</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Row>
        <Col >
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date *</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Heure *</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default CreateEmploiDuTemps;