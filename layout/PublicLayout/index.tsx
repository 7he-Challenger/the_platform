import React, { PropsWithChildren,  useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '~assets/styles/Home.module.css'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import _ from 'lodash'
import { logOut } from '~lib/auth'

const PublicLayout = ({children, outside} : PropsWithChildren & {outside?: boolean}) => {
    const {data} = useSession()
    const isLogged = useMemo(()=> !_.isEmpty(data), [data])

    const handleLogout = () => {
        if(confirm('Se deconnecter ?')) {
          logOut()
        }
      }
  return (
    <div className={`${!outside ? styles.container : ""} ${styles["public-container-main"]}`}>
    <Head>
      <title>TechZara Platform</title>
      <meta name="description" content="TechZara Platform app" />
      <link rel="icon" href="/assets/icons/logo.png" />
    </Head>

    {/* <div className="loader-page">
      <div className="loader">
          <p className="loader_txt">Loading...</p>
          <div className="loader_arc"></div>
          <div className="loader_rnd_container">
              <div className="loader_rnd"></div>
          </div>
      </div>
  </div> */}
  <div className="container flex">
      <nav>
          <span className="logo">
              <Link href="/">
                  <Image src="assets/images/logo.png" alt="logo TechZara" layout='fill'/>
              </Link>
          </span>
          <div className="menu-icon" id="menu-button">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
          </div>
          <ul className="menu">
              <li>
                  <Link href="/" >Acceuil</Link>
              </li>
              <li>
                  <Link href="/events">Evènements</Link>
              </li>
              {
                isLogged ? (
                    <>
                    <li>
                        <Link href="/member-presentation"> Les Membres</Link>
                    </li>
                    <li>
                        <Link href="/dashboard" >Administration</Link>
                    </li>
                    <li>
                        <div onClick={handleLogout}>
                            <Link href="#">Se deconnecter</Link>
                        </div>
                    </li>
                    </>
                 ) : ( 
                    <li>
                        <Link href="/login">Se connecter</Link>
                    </li>

                  )
              }
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
    {!outside && children}
  </div>
    {outside && children}
  <Script src="js/main.js" />
  <Script src="js/darkmode.js" />
  </div>
  )
}

export default PublicLayout