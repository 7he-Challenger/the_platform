import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import useLogin from '~hooks/useLogin'

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
    <div className="bg-primary min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={4} className="h-50">
            <Row>
              <Col md={12} className="bg-white card border p-3">
                <div className="card-header">
                  <h1 className='text-center'>CONNEXION</h1>
                </div>
                <div className="card-body">
                  {
                    errorCredential && ( <span className="text-danger">{errorCredential}</span>)
                  }
                  <form onSubmit={submitLogin}>
                    <InputGroup className="mb-3">
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

                    <InputGroup className="mb-3">
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
                        <Button className="px-4 w-100" variant="primary" type="submit">Se connecter</Button>
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
