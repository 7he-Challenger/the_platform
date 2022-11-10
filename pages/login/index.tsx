import { NextPage } from 'next'
import { LoginLeftCard } from '../../components/login-left-card/login.left-card'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import useLogin from '~hooks/useLogin'
import Image from 'next/image'

const Login: NextPage = () => {
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
    <div className='login-container row'>
      <Col sm="6" className="d-none d-md-block">
        <div className="container left">
        <LoginLeftCard />
        <div className="description">
          <h5>
            Un Nouvel Espace<br />
            Communautaire
          </h5>
          <p>
            Une communauté des passionés de la nouvelle technologie <br />
            et de partage pour s&apos;entraidé.
          </p>
        </div>

        </div>
      </Col>
      <Col sm="12" md="6" className="container login-form">
        <div>
          <div className="header">
            <Image src="/assets/icons/logo.png" alt="logo" width="100" height="100" />
            <h1>Techzara <span style={{color: "rgb(82 171 227)"}}>Madagascar</span></h1>
            <p className="text-black-50 opacity-75">
              Bon retour parmis nous, <br />
              Connectez vous à votre compte
            </p>
          </div>
          {errorCredential && (<span className="text-danger">{errorCredential}</span>)}
          <form onSubmit={submitLogin}>
            <InputGroup className="mb-3">
              <Form.Control
                name="username"
                required
                placeholder="Nom d'utilisateur"
                aria-label="username"
                value={emailValue || ''}
                onChange={(e) => handleInputEmail(e.target.value)}
              />
              {invalideUser && (<span className="text-danger">{invalideUser}</span>)}
            </InputGroup>
            <InputGroup className="mb-2">
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Mot de passe"
                aria-label="Password"
                value={passwordValue || ''}
                onChange={(e) => handleInputPassword(e.target.value)}
              />
              {invalidePassword && (<span className="text-danger">{invalidePassword}</span>)}
            </InputGroup>
            {/*<div className="mb-3" style={{display:'flex', justifyContent: 'space-between'}}>
              <Form.Check type="checkbox" style={{fontSize: '14px', color: '#00000066'}} label="Remember Me?" />
              <a href="" className="login-link">Recovery Password</a>
            </div>*/}
            <div className="d-grid gap-2" style={{marginBottom: '40px'}}>
              <Button className="px-4" variant="primary" type="submit">Se Connecter</Button>
              {/*<Button className="px-4" variant="outline-dark" type="submit">
                <span style={{position: 'relative', top: '3px'}}>
                  <Image src="/assets/images/google.png" alt="google" width="18" height="18" />
                </span>
                &nbsp;  
                Sign In With Google
              </Button>*/}
            </div>
            <div className="login-footer">
                <p>
                  Vous n&apos;avez pas encore de compte ? <a href="" className="login-link">S&apos;Inscrire</a>
                </p>
            </div>
          </form>
        </div>
      </Col>
    </div>
  )
}

export default Login
