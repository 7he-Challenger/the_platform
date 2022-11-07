import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import useLogin from '~hooks/useLogin'
import Style from '~assets/styles/Login.module.css'
import Image from 'next/image'

const Login: NextPage = (props) => {
  const {
    emailValue,
    passwordValue,
    handleInputEmail,
    handleInputPassword,
    invalidePassword,
    invalideUser,
    submitLogin,
    errorCredential
  } = useLogin()

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col className="col-md-7 col-lg-5">
            <Row>
              <Col className={Style.loginContainer+" p-4 p-md-5"}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-center">
                    <Image alt="Logo Techzara" width={"210px"} height={"100%"} src="assets/images/logo.jpg"/>
                  </div>
                  <p className="p-3 text-center">Bienvenue sur l&apos;administration de la plateforme Techzara, identifiez-vous.</p>
                  {
                    errorCredential && ( <span className="text-danger">{errorCredential}</span>)
                  }
                  <form onSubmit={submitLogin}>
                    <InputGroup className={Style.inputGroup + " form-group"}>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faUser}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        required
                        placeholder="Nom d'utilisateur"
                        aria-label="Nom d'utilisateur"
                        value={emailValue || ''}
                        onChange={(e) => handleInputEmail(e.target.value)}
                      />
                      {
                        invalideUser && (
                          <span className="text-danger">{invalideUser}</span>
                        )
                      }
                    </InputGroup>

                    <InputGroup className={Style.inputGroup + " form-group"}>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faLock}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        placeholder="Mots de passe"
                        aria-label="Mots de passe"
                        value={passwordValue || ''}
                        onChange={(e) => handleInputPassword(e.target.value)}
                      />
                      {
                        invalidePassword && (
                          <span className="text-danger">{invalidePassword}</span>
                        )
                      }
                    </InputGroup>

                    <Row>
                      <Col xs={12}>
                        <Button className="px-4 w-100 btn-lg" variant="primary" type="submit">Se&nbsp;connecter</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
