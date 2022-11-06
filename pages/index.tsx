import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '~assets/styles/Home.module.css'
import Script from 'next/script'
// import globalStyle from '~assets/styles/globals.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
        <section className="hero">
            <div className="hero-content">
                <div className="haingo top left">
                    <svg width="303" height="18" viewBox="0 0 303 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="109" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="75" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="41" cy="7" r="7" fill="#FFD18B"/>
                        <rect x="138" y="14" width="165" height="4" fill="#FFD18B"/>
                    </svg>
                </div>
                <div className="haingo bottom right">
                    <svg width="303" height="18" viewBox="0 0 303 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="194" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="296" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="262" cy="7" r="7" fill="#FFD18B"/>
                        <circle cx="228" cy="7" r="7" fill="#FFD18B"/>
                        <rect y="14" width="165" height="4" fill="#FFD18B"/>
                    </svg>                    
                </div>
                <div className="cover-animation"></div>
                <div className="topic-animation"></div>
                <div className="image learn">
                    <Image src="assets/images/learn.svg" layout="fill" alt="learn"/>
                </div>
                <div className="image build">
                    <Image src="assets/images/build.svg" layout="fill" alt="build"/>
                </div>
                <div className="image share">
                    <Image src="assets/images/share.svg" layout="fill" alt="share"/>
                </div>
            </div>
        </section>
        <section className="description">
            <div className="description-content">
                <div className="haingo right">
                    <svg width="872" height="848" viewBox="0 0 872 848" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="801" cy="71" r="71" fill="#D75A6A"/>
                        <rect y="62" width="730" height="10" fill="#D75A6A"/>
                        <rect x="834" y="118" width="730" height="10" transform="rotate(90 834 118)" fill="#D75A6A"/>
                    </svg>
                </div>
                <div className="haingo middle-bottom middle-left">
                    <svg width="136" height="54" viewBox="0 0 136 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="33" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="19" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="89" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="117" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="131" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="103" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="47" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="75" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="61" cy="5" r="5" fill="#FFEB3B"/>
                        <circle cx="5" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="33" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="19" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="89" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="117" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="131" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="103" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="47" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="75" cy="49" r="5" fill="#FFEB3B"/>
                        <circle cx="61" cy="49" r="5" fill="#FFEB3B"/>
                    </svg>            
                </div>
                <div className="left item">
                    <h2>Qui nous sommes?</h2>
                    <p>
                        Nous sommes une communauté d&apos;étudiants, d&apos;autodidactes, de geeks et de passionnés d&apos;informatique pour leur faire partager leur expertise dans le domaine des nouvelles technologies, nous pensons que les jeunes malgache ont de nombreux talents dans le domaine de l&apos;informatique.<br/>
                        <br/>
                        Il y a quatre communautés à Techzara, Geeka Girls, Electronique et Robotique, Développeurs, Réseau et Système. Nous organisons des ateliers tous les samedis pour partager des nouveautés ou créer des trucs sympas dans le domaine de la tech.
                    </p>
                </div>
                <div className="right item">
                    <h2>Que faisons-nous?</h2>
                    <p>
                        Nous organisons de nombreux événements pour créer des liens entre toutes les personnes intéressées par les nouvelles technologies.<br/>
                        <br/>
                        Vous avez peut-être déjà entendu parler des Hackathon Inter-Universitaire, IT-Connect, Hackathon Frontend Awards...
                    </p>
                </div>
            </div>
        </section>
        <section className="memories">
            <div className="haingo centered-top-left">
                <div className="circle-sliced">
                    <svg width="450" height="56" viewBox="0 0 450 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="225" cy="225" r="225" fill="#FFD18B"/>
                    </svg>
                    <svg width="450" height="8" viewBox="0 0 450 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="225" cy="126" r="225" fill="#FFD18B"/>
                    </svg>
                    <svg width="450" height="8" viewBox="0 0 450 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="225" cy="75" r="225" fill="#FFD18B"/>
                    </svg>
                    <svg width="450" height="249" viewBox="0 0 450 249" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="225" cy="24" r="225" fill="#FFD18B"/>
                    </svg>
                </div>
            </div>
            <div className="haingo middle-top left">
                <svg width="14" height="242" viewBox="0 0 14 242" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="83" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="159" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="235" r="7" fill="#D75A6A"/>
                </svg>                    
            </div>
            <div className="haingo top right">
                <svg width="14" height="242" viewBox="0 0 14 242" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="83" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="159" r="7" fill="#D75A6A"/>
                    <circle cx="7" cy="235" r="7" fill="#D75A6A"/>
                </svg>                    
            </div>
            <div className="memories-content">
                <h2>
                    Des instants merveilleux
                </h2>
                <div className="y-slide-container">
                    <div className="y-slide-item slide1">
                        <Image src="assets/images/2020.jpg" layout='fill' objectFit='cover' alt="#2020"/>
                        <div className="y-slide-caption-container">
                            <span className="y-slide-caption-text">
                                #2020
                            </span>
                        </div>
                    </div>                    
                    <div className="y-slide-item slide2">
                        <Image src="assets/images/versera.jpg" layout='fill' objectFit='cover' alt="#birthday"/>
                        <div className="y-slide-caption-container">
                            <span className="y-slide-caption-text">
                                #5th_anniversaire
                            </span>
                        </div>
                    </div>                    
                    <div className="y-slide-item slide3">
                        <Image src="assets/images/membres.jpg" layout='fill' objectFit='cover' alt="#members_2022"/>
                        <div className="y-slide-caption-container">
                            <span className="y-slide-caption-text">
                                #membres_2022
                            </span>
                        </div>
                    </div>                         
                    <div className="y-slide-item slide4">
                        <Image src="assets/images/13fo.jpg" layout='fill' objectFit='cover' alt="#13_fô"/>
                        <div className="y-slide-caption-container">
                            <span className="y-slide-caption-text">
                                #13_fô
                            </span>
                        </div>
                    </div>
                </div>                 
                <a className="y-slider y-slide-prev">
                    <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.5 37.7634L4.272 21L27.5 4.23664L27.5 37.7634Z" stroke="#146DB6" strokeWidth="5"/>
                    </svg>                            
                </a>
                <a className="y-slider y-slide-next">
                    <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 37.7634L25.728 21L2.5 4.23664L2.5 37.7634Z" stroke="#146DB6" strokeWidth="5"/>
                    </svg>                            
                </a>
            </div>
        </section>
        <footer>
            <div className="footer-content">
                <div className="join-contact">
                    <div className="haingo bottom middle-left">
                        <svg width="653" height="276" viewBox="0 0 653 276" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="248" width="653" height="10" fill="#FFD18B"/>
                            <rect y="258" width="258" height="10" transform="rotate(-90 0 258)" fill="#FFD18B"/>
                            <circle cx="190" cy="253" r="23" fill="#D75A6A"/>
                        </svg>                        
                    </div>
                    <div className="left item">
                        <h2>Rejoignez notre équipe</h2>
                        <p>
                            Faites partie de notre communauté pour profiter ensemble des incroyables sensations entre informaticiens. Commencez l&apos;aventure en <a href="#">vous inscrivant ici</a>.
                        </p>
                    </div>
                    <div className="right item" id="contact">
                        <h2>Contact</h2>
                        <p>Pour plus d&apos;information ou questions, nous sommes à votre disposition</p>
                        <form>
                            <input type="email" placeholder="adresse mail"/>
                            <textarea placeholder="messages"></textarea>
                            <button>envoyer</button>
                        </form>
                    </div>
                </div>
                <hr/>
                <div className="copyright">
                    <a className="logo" href="#">
                        <div className="logo-container">
                        <Image src="assets/icons/logo.jpg" alt="logo TechZara" width="30" height="30"/>
                        </div>
                        <span className="text">TechZara</span>
                    </a> - &copy; copyright 2022
                </div>
            </div>
        </footer>
    </div>
    <Script src="js/tz-animation.js" strategy='lazyOnload'></Script>
    <Script src="js/main.js" strategy='lazyOnload'></Script>
    <Script src="js/y-slide.js" strategy='lazyOnload'></Script>
    <Script src="js/darkmode.js" strategy='lazyOnload'></Script>
    </div>
  )
}

export default Home
