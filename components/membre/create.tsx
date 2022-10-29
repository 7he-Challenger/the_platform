import { Button, Col, Row, Form, InputGroup } from "react-bootstrap";
import { ROLE_TYPES } from "~constantes/user-roles";
import { USER_TYPES } from "~constantes/user-types";
import { useFormUser } from "~hooks/useMember";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Style from '~assets/styles/Activity.module.css';
import { formatUserDataForm } from "~lib/format-user";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"

type CreateMemberType = {
  toUpdate?: any,
  isVisible?: boolean,
  submitUser: Function
}

const CreateMember = ({
  toUpdate = null,
  isVisible = false,
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

  const toggle = () => {
    isVisible = !isVisible
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTheme">
        <Form.Label>Nom d&rsquo;utilisateur *</Form.Label>
        <Form.Control 
          type="text" 
          value={body.username}
          onChange={(e) => handleChangeValueForm('username', e.target.value)}
          required
        />
      </Form.Group>

      {!toUpdate && 
        (<fieldset>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mot de passe *</Form.Label>
          <Form.Control 
            type="password"
            value={body.password}
            onChange={(e) => handleChangeValueForm('password', e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirmer le Mot de passe *</Form.Label>
          <Form.Control 
            type="password"
          />
        </Form.Group>
        </fieldset>)
      }

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

      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Rôle</Form.Label>
        <Form.Select 
          aria-label="Selectionnez un rôle"
          value={body.role}
          onChange={(e) => handleChangeValueForm('role', e.target.value)}
        >
          {
            ROLE_TYPES.map((roleType, index) => (
              <option key={`role-type-${index}`} value={roleType.value}>
                {roleType.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Select 
          aria-label="Selectionnez son type"
          value={body.userType}
          onChange={(e) => handleChangeValueForm('userType', e.target.value)}
        >
          {
            USER_TYPES.map((userTypes, index) => (
              <option key={`user-type-${index}`} value={userTypes.value}>
                {userTypes.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Adresse</Form.Label>
        <Form.Control 
          type="text" 
          value={body.userInfo?.address}
          onChange={(e) => handleChangeValueForm('address', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control 
          type="text" 
          value={body.userInfo?.phone}
          onChange={(e) => handleChangeValueForm('userInfo?.phone', e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </div>
    </form>
  )
}

export default CreateMember;