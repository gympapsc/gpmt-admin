import React from 'react'
// import { Provider } from 'react-redux'
import "../polyfills"

// import store from '../store'

import '../styles/global.css'


// eslint-disable-next-line react/prop-types
function Root({ Component, pageProps }) {    
    return (
        <Component {...pageProps} />
    )
}


export default Root

