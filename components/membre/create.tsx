import { Button, Col, Row, Form } from "react-bootstrap";
import { ROLE_TYPES } from "~constantes/roles-user";
import { useFormUser } from "~hooks/useMember";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Style from '~assets/styles/Activity.module.css';
import { formatUserDataForm } from "~lib/format-user";

type CreateMemberType = {
  toUpdate?: any,
  submitUser: Function
}

const CreateMember = ({
  toUpdate = null,
  submitUser = () => {}
}: CreateMemberType) => {
  const {
    body,
    handleChangeValueForm
  } = useFormUser(toUpdate)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    submitUser(formatUserDataForm(body), body.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTheme">
        <Form.Label>Nom d&rsquo;utilisateur</Form.Label>
        <Form.Control 
          type="text" 
          value={body.username}
          onChange={(e) => handleChangeValueForm('username', e.target.value)}
          required
        />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea"
          value={body.description} 
          onChange={(e) => handleChangeValueForm('description', e.target.value)}
        />
      </Form.Group> */}

      {/* <Form.Group className="mb-3" controlId="formTheme">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control 
          type="password" 
          value={body.password}
          onChange={(e) => handleChangeValueForm('password', e.target.value)}
          required
        />
      </Form.Group> */}

      

      <Form.Group className="mb-3" controlId="formLieu">
        <Form.Label>Nom</Form.Label>
        <Form.Control 
          type="text" 
          value={body.lastname}
          onChange={(e) => handleChangeValueForm('lastname', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIntervenant">
        <Form.Label>Prénom(s)</Form.Label>
        <Form.Control 
          type="text" 
          value={body.firstname}
          onChange={(e) => handleChangeValueForm('firstname', e.target.value)}
        />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Rôle</Form.Label>
        <Form.Select 
          aria-label="Selectionnez un rôle"
          value={body.roles}
          onChange={(e) => handleChangeValueForm('roles', e.target.value)}
        >
          {
            ROLE_TYPES.map((roleType, index) => (
              <option key={`role-type-${index}`} value={roleType.value}>
                {roleType.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group> */}

      {/* <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date de début</Form.Label>
        <Row>
          <Col>
            <Form.Control 
              type="date"
              value={body.startDate.split(' ')[0] || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value, 'date')}
            />
          </Col>
          <Col>
            <Form.Control 
              type="time"
              value={body.startDate.split(' ')[1] || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value, 'time')}
            />
          </Col>
        </Row>
      </Form.Group> */}

      {/* <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date de fin</Form.Label>
        <Row>
          <Col>
            <Form.Control 
              type="date"
              value={body.endDate.split(' ')[0] || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value, 'date')}
            />
          </Col>
          <Col>
            <Form.Control 
              type="time"
              value={body.endDate.split(' ')[1] || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value, 'time')}
            />
          </Col>
        </Row>
      </Form.Group> */}

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </div>
    </form>
  )
}

export default CreateMember;