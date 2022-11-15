import type { NextPage } from 'next'
import Head from 'next/head'
import { logOut } from '~lib/auth'
import { getActivityById } from '~repositories/activities'
import styles from '~assets/styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'

const EventInscription: NextPage = (props) => {
  const {
    activity
  } = props as any

  return (
    <div className={styles.container}>
      <Head>
        <title>TechZara Platform</title>
        <meta name="description" content="TechZara Platform app" />
        <link rel="icon" href="/assets/icons/logo.png" />
      </Head>

      <div className="container flex">
        <nav>
            <a className="logo" href="#">
                <div className="logo-container">
                    <Image src="assets/icons/logo.jpg" alt="logo TechZara" width="30" height="30"/>
                </div>
                <span className="text">TechZara</span>
            </a>
            <div className="menu-icon" id="menu-button">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <ul className="menu">
                <li>
                    <Link href="/login">Connexion</Link>
                </li>
                <li>
                    <Link href="#contact">Contact</Link>
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