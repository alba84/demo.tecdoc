'use strict'
/* eslint-disable */
import axios from 'axios'

export const HTTP = axios.create({
    //baseURL: 'https://some-domain.com/api/',
    
    //timeout: 1000,

    //headers: {'X-Custom-Header': 'foobar'}

    responseType: 'json', // default

    // `responseEncoding` indicates encoding to use for decoding responses
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },

    // 'proxy' defines the hostname and port of the proxy server
    // Use `false` to disable proxies, ignoring environment variables.
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
    // supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing
    // `Proxy-Authorization` custom headers you have set using `headers`.
    /*proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },*/
})