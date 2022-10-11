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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={12} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>
                  {
                    errorCredential && (
                      <span className="text-danger">{errorCredential}</span>
                    )
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
                        placeholder="Username"
                        aria-label="Username"
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
                        placeholder="Password"
                        aria-label="Password"
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
                      <Col xs={6}>
                        <Button className="px-4" variant="primary" type="submit">Login</Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button className="px-0" variant="link" type="submit">
                          Forgot
                          password?
                        </Button>
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
