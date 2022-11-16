import type { NextPage } from 'next'
import Head from 'next/head'
import homeStyles from '~assets/styles/Home.module.css'
import styles from '~assets/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getPublicActivity } from '~repositories/activities'
import { Button, Card } from 'react-bootstrap'
import ENDPOINT from '~constantes/enpoint'
import { formatDate } from '~lib/format'

const EventList: NextPage = (props) => {
  const {
    activities
  } = props as any

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

        <section className="w-100 py-5 px-5">
          <div className="row">
            {
              activities.map((
                activity: any, 
                index: number
              ) => (
                <div
                  key={`activity-item-${index}`}
                  className="col-lg-4 my-2"
                >
                  <Card className={styles.itemActivity}>
                    {
                      activity.posters.length > 0 && (
                        <Card.Img 
                          variant="top"
                          src={`${ENDPOINT.MEDIA_PATH}${activity.posters[0].contentUrl}`}
                          className={styles.imgActivity}
                        />
                      )
                    }
                    <Card.Body>
                      <div className="flex flex-column justify-content-between h-100">
                        <div className="mb-3">
                          <Card.Title>{ activity.title }</Card.Title>
                          <Card.Body>
                            <div>
                              {activity.locale}, {formatDate(activity.startDate)}
                            </div>
                            <div>
                              {activity.description}
                            </div>
                          </Card.Body>
                        </div>
                        <Link 
                          href={`/events/registration/${activity.id}`}
                        >
                          <Button 
                            className={`${styles.itemActivityInscription}`}
                            // disabled={activity.seats == 0}
                          >
                            S&rsquo;inscrire

                            {/* <span className="mx-2">({activity.seats})</span> */}
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  try {
    let activities: any = await getPublicActivity()

    return {
      props: {
        activities
      }
    }
  }catch(e: any){
    console.log(e)
    return {
      props: {
        activities: []
      }
    }
  }
}

export default EventList;