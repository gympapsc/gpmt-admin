import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Head from "next/head"

import store from '../store'

import '../styles/global.css'


// eslint-disable-next-line react/prop-types
function Root({ Component, pageProps }) {
    
    useEffect(() => {
        document.documentElement.lang = "de-de";
    }, [Component])
    
    return (
        <>
            <Head>
                <title>GPMT Admin</title>
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <meta name="description" content="Gymnasium Papenburg Miktionstagebuch Applikation" />
                <link rel="shortcut icon" href="/img/favicon.png" />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}


export default Root

