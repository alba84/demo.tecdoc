/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
// Импорт хранилища
import storePlugin from './storePlugin'  

import App from './App'

Vue.config.productionTip = false

Vue.use(storePlugin)  
Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
