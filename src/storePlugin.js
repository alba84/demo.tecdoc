/* eslint-disable */
import {STORE} from './store'

export default {  
    STORE,
    install (Vue, options) {
        Vue.prototype.$store = STORE
    }
}
