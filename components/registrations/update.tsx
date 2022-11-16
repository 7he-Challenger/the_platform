import { Button, Form } from "react-bootstrap"
import { useFormRegistration } from "~hooks/useEmploiDuTemps"

type UpdateRegistrationType = {
  toUpdate: any,
  submitRegistration: Function
}

const FormUpdateRegistration = ({
  toUpdate,
  submitRegistration
}: UpdateRegistrationType) => {
  const {
    body,
    handleChangeValueForm,
    toUpdate: registration
  } = useFormRegistration(toUpdate)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    submitRegistration(
      body, 
      registration.id
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formLieu">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="text" 
          value={body.email}
          onChange={(e) => handleChangeValueForm('email', e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSeats">
        <Form.Label>Nombre de chaises</Form.Label>
        <Form.Control 
          type="number" 
          value={body.seatNumber}
          onChange={(e) => handleChangeValueForm(
            'seatNumber', 
            parseInt(e.target.value) 
          )}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default FormUpdateRegistration