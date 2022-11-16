import type { NextPage } from 'next'
import Head from 'next/head'
import { logOut } from '~lib/auth'
import { getActivityById } from '~repositories/activities'
import homeStyles from '~assets/styles/Home.module.css'
import styles from '~assets/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useFormInscriptionEvent } from '~hooks/useEmploiDuTemps'

const EventInscription: NextPage = (props) => {
  const {
    activity
  } = props as any

  const {
    body,
    handleChangeValueForm,
    submitInscription,
    alertInscription
  } = useFormInscriptionEvent(activity)

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>TechZara Platform</title>
        <meta name="description" content="TechZara Platform app" />
        <link rel="icon" href="/assets/icons/logo.png" />
      </Head>

      <div className="container flex">
        <nav>
            <Link className="logo" href="/">
                <Image src="assets/images/logo.jpg" alt="logo TechZara" layout='fill'/>
            </Link>
            <div className="menu-icon" id="menu-button">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <ul className="menu">
                <li>
                    <Link href="/">Acceuil</Link>
                </li>
                <li>
                    <Link href="/events">Evènements</Link>
                </li>
                <li>
                    <Link href="/login">Connexion</Link>
                </li>
            </ul>
        </nav>
        <div className="switch-mode-btn">
            <input type="checkbox" className="dark-mode-checkbox-activated"/>
            <div className="moon">
                <div className="shadow"></div>
            </div>
            <div className="sun">
                <div className="light"></div>
            </div>
        </div>

        <section className="memories">
          <h1>
            { activity.title }
          </h1>
        </section>

        <section className="w-100 py-5 px-5">
          <Card>
            <Card.Body>
              <form onSubmit={submitInscription}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    required
                    value={body.email}
                    onChange={(e) => handleChangeValueForm('email', e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSeats">
                  <Form.Label>Nombre de chaises</Form.Label>
                  <Form.Control 
                    type="number" 
                    min={1}
                    required
                    value={body.seatNumber}
                    onChange={(e) => handleChangeValueForm('seatNumber', parseInt(e.target.value))}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Valider
                  </Button>
                </div>
              </form>

              {
                alertInscription && (
                  <Alert key="success" variant="success" className="my-2">
                    {alertInscription}
                  </Alert>
                )
              }
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  
  try {
    let activity: any = await getActivityById(context.query.id)

    return {
      props: {
        activity
      }
    }
  }catch(e: any){
    if(e.response?.status == 404){
      return {
        notFound: true
      }
    }
    logOut()
    return {
      props: {

      }
    }
  }
}

export default EventInscription;