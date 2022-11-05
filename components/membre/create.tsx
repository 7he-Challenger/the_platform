import { Button, Col, Row, Form, InputGroup, Alert } from "react-bootstrap";
import { ROLE_TYPES } from "~constantes/user-roles";
import { USER_TYPES } from "~constantes/user-types";
import { useFormUser } from "~hooks/useMember";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
// import Style from '~assets/styles/Activity.module.css';
import { formatUserDataForm } from "~lib/format-user";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { useForm } from "react-hook-form"
import Style from '~assets/styles/Login.module.css'

type CreateMemberType = {
  toUpdate?: any,
  submitUser: Function
}

const CreateMember = ({
  toUpdate = null,
  submitUser = () => {}
}: CreateMemberType) => {

  const [isVisible, setIsVisible] = useState(true);

  const toggle = () => setIsVisible(!isVisible)

  const { register, watch, formState: { errors } } = useForm({
    mode:'onTouched'
  });

  const pwd = watch('pwd')

  const {
    body,
    handleChangeValueForm,
    handleChangeOtherValueForm
  } = useFormUser(toUpdate)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    submitUser(formatUserDataForm(body), body.id)
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
          
          <Form.Label>Mot de passe *</Form.Label>
          <InputGroup className={Style.inputGroups + " form-group"}>
          <Form.Control 
            {...register("pwd", { required: 'Mot de passe requis',
            pattern: {
              value: /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/,
              message:'Le mot de passe doit inclure au moins une majuscule, une valeur numérique et un caractère spécial'
            },
            minLength: {
              value: 8,
              message: 'La longueur minimale requise est de 8'
            },
            maxLength: {
              value: 20,
              message: 'La longueur maximale requise est de 20'
            }
            })}
            type={ isVisible ? "password" : "text"}
            value={body.password}
            onChange={(e) => handleChangeValueForm('password', e.target.value)}
            required
          />
        <InputGroup.Text>
          <FontAwesomeIcon
            icon={ isVisible ? faEyeSlash : faEye}
            fixedWidth
            onClick={toggle}
          />
        </InputGroup.Text>
        </InputGroup>
        {errors.pwd && <span className={Style.textRed}>{errors.pwd.message} <br /><br /></span>}
        


        <Form.Label>Confirmer le mot de passe *</Form.Label>
          <InputGroup className={Style.inputGroups + " form-group"}>
          <Form.Control
            {...register("cfpwd", { 
              required: 'Confirmer le mot de passe est requis',
              validate: (value) => value === pwd || "Le mot de passe ne correspond pas",
            })}
            onPaste={(e)=>{
              e.preventDefault()
              return false;
            }}
            type={ isVisible ? "password" : "text"}
            required
          />
        <InputGroup.Text>
          <FontAwesomeIcon
            icon={ isVisible ? faEyeSlash : faEye}
            fixedWidth
            onClick={toggle}
          />
        </InputGroup.Text>
        </InputGroup>
        {errors.cfpwd && <span className={Style.textRed}>{errors.cfpwd.message} <br /><br /></span>}

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
          onChange={(e) => handleChangeOtherValueForm('userInfo', 'address', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control 
          type="text" 
          value={body.userInfo?.phone}
          onChange={(e) => handleChangeOtherValueForm('userInfo', 'phone', e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" disabled={(errors.cfpwd || errors.pwd) ? true : false}>
          Soumettre
        </Button>
      </div>
    </form>
  )
}

export default CreateMember;