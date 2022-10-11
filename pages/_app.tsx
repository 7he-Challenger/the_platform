import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
// import '../styles/globals.css'
import type { AppProps } from 'next/app'

import PageChange from "components/PageChange/PageChange";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/nextjs-argon-dashboard.scss";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>TechZara</title>
        
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp
